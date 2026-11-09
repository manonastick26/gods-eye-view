import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { createEsriImagery } from '../../../src/maps/imagery.js';
import { formatAlignment, proposeAlignment } from './alignment.js';
import { GRAND_CANYON_NOTES } from './canyon.js';
import { safeSourceUrl } from './content.js';
import {
  DISCOVERY_LABELS,
  RECENT_DISCOVERIES,
  describeDiscoveries,
} from './discoveries.js';
import {
  SOUTH_AMERICA_LIDAR,
  describeLidarCatalog,
  modelLoadPlan,
  modelNoteFor,
} from './lidarCatalog.js';
import {
  ANCIENT_SITES,
  filterSites,
  siteById,
} from './sites.js';
import {
  addAlignment,
  clearAlignments,
  readAlignments,
  readFavorites,
  removeAlignment,
  toggleFavorite,
} from './store.js';

const storage = globalThis.localStorage;
const viewerHost = document.querySelector('#globe');
const list = document.querySelector('#site-list');
const detail = document.querySelector('#detail');
const search = document.querySelector('#search');
const region = document.querySelector('#region');
const alignStatus = document.querySelector('#align-status');
const alignList = document.querySelector('#align-list');
let selectedId = null;
let alignFrom = null;
const lineEntities = new Map();

Cesium.Ion.defaultAccessToken = '';

const viewer = new Cesium.Viewer(viewerHost, {
  baseLayer: false,
  baseLayerPicker: false,
  geocoder: false,
  homeButton: true,
  sceneModePicker: false,
  navigationHelpButton: false,
  animation: false,
  timeline: false,
  fullscreenButton: false,
  infoBox: false,
  selectionIndicator: true,
  terrainProvider: new Cesium.EllipsoidTerrainProvider(),
  creditContainer: document.createElement('div'),
});
const creditBox = viewerHost.appendChild(viewer.creditContainer || document.createElement('div'));
creditBox.id = 'credits';

const basemap = document.createElement('p');
basemap.className = 'fine';
basemap.textContent = 'Basemap: loading Esri World Imagery. This is a picture of the surface, not a LiDAR scan.';
document.querySelector('#top').appendChild(basemap);

async function loadBasemap() {
  try {
    viewer.imageryLayers.addImageryProvider(await createEsriImagery());
    basemap.textContent =
      'Basemap: Esri World Imagery. Proprietary hosted satellite picture, not a LiDAR scan and not a model of a building. Ellipsoid underneath is generic, not a survey.';
  } catch (error) {
    basemap.textContent = `Basemap failed (${error.message}). No imagery is being substituted with a fake scan.`;
  }
}

for (const site of ANCIENT_SITES) {
  viewer.entities.add({
    id: site.id,
    name: site.name,
    position: Cesium.Cartesian3.fromDegrees(site.lon, site.lat),
    point: {
      pixelSize: 10,
      color: Cesium.Color.fromCssColorString('#8c4a2f'),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2,
    },
  });
}

function flyTo(site) {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(site.lon, site.lat, 18000),
    duration: 1.4,
  });
}

function renderList() {
  const rows = filterSites(ANCIENT_SITES, {
    query: search.value,
    region: region.value,
  });
  list.replaceChildren();
  for (const site of rows) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.siteId = site.id;
    button.textContent = `${site.name} · ${site.country}`;
    button.setAttribute('aria-current', site.id === selectedId ? 'true' : 'false');
    button.addEventListener('click', () => select(site.id));
    item.appendChild(button);
    list.appendChild(item);
  }
  if (!rows.length) {
    const item = document.createElement('li');
    item.textContent = 'No marker matches that filter.';
    list.appendChild(item);
  }
}

function select(id) {
  const site = siteById(id);
  if (!site) return;
  if (alignFrom && alignFrom !== id) {
    addAlignment(storage, alignFrom, id);
    alignFrom = null;
    drawAlignments();
  }
  selectedId = id;
  viewer.selectedEntity = viewer.entities.getById(id);
  flyTo(site);
  const favorites = readFavorites(storage);
  detail.hidden = false;
  document.querySelector('#detail-name').textContent = site.name;
  document.querySelector('#detail-body').textContent = [
    site.country,
    site.type,
    site.culture,
    `Period: ${site.periodLabel}. ${site.periodNote}`,
    site.coordinateNote,
    `Marker: ${site.lat.toFixed(4)}, ${site.lon.toFixed(4)}.`,
  ].join(' ');
  const link = document.querySelector('#detail-source');
  const href = safeSourceUrl(site.sourceUrl);
  link.href = href || '#';
  link.textContent = href ? site.sourceName : 'Source link withheld';
  const note = modelNoteFor(site.id);
  document.querySelector('#detail-model').textContent = note
    ? `3D model: not drawn. ${note.acquisitionNote} ${note.formatNote} ${note.licenseNote} ${note.note}`
    : `3D model: ${modelLoadPlan(site.model).reason}`;
  document.querySelector('#detail-lidar').textContent = site.lidar.note;
  document.querySelector('#favorite').textContent = favorites.includes(site.id)
    ? 'Remove favorite'
    : 'Save favorite';
  renderList();
  renderAlignments();
}

function renderAlignments() {
  const saved = readAlignments(storage);
  alignList.replaceChildren();
  if (!saved.length) {
    alignStatus.textContent = alignFrom
      ? `Alignment start: ${siteById(alignFrom)?.name}. Choose the other marker.`
      : 'Choose a start, then another marker. Nothing is drawn until you do.';
  }
  for (const item of saved) {
    const from = siteById(item.fromId);
    const to = siteById(item.toId);
    const path = from && to ? proposeAlignment(from, to) : null;
    const row = document.createElement('li');
    const text = document.createElement('p');
    text.textContent = from && to
      ? `${from.name} to ${to.name}. ${formatAlignment(path)}`
      : 'A saved pair no longer matches a marker.';
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Remove';
    remove.addEventListener('click', () => {
      removeAlignment(storage, item.id);
      drawAlignments();
    });
    row.append(text, remove);
    alignList.appendChild(row);
  }
}

function drawAlignments() {
  for (const entity of lineEntities.values()) viewer.entities.remove(entity);
  lineEntities.clear();
  for (const item of readAlignments(storage)) {
    const from = siteById(item.fromId);
    const to = siteById(item.toId);
    if (!from || !to) continue;
    const path = proposeAlignment(from, to);
    if (!path.ok || path.samples.length < 2) continue;
    const entity = viewer.entities.add({
      id: `align-${item.id}`,
      polyline: {
        positions: path.samples.map((point) =>
          Cesium.Cartesian3.fromDegrees(point.lon, point.lat, 0),
        ),
        width: 3,
        arcType: Cesium.ArcType.NONE,
        material: Cesium.Color.fromCssColorString('#8c4a2f'),
      },
    });
    lineEntities.set(item.id, entity);
  }
  renderAlignments();
}

function renderLidar() {
  const summary = describeLidarCatalog();
  document.querySelector('#lidar-summary').textContent = `${summary.title}. ${summary.detail}`;
  const host = document.querySelector('#lidar-list');
  host.replaceChildren();
  for (const record of SOUTH_AMERICA_LIDAR) {
    const item = document.createElement('li');
    const text = document.createElement('p');
    text.textContent = [
      record.title,
      `Kind: ${record.kind}. Format: ${record.format}. Not drawn.`,
      `Acquisition: ${record.acquisitionStart || 'not copied'}–${record.acquisitionEnd || 'not copied'}. ${record.acquisitionNote}`,
      `Publication: ${record.publicationDate || 'not stated on the page checked'}.`,
      record.coverage,
      record.resolutionNote,
      `License: ${record.license}.`,
      record.bytesNote,
    ].join(' ');
    const link = document.createElement('a');
    const href = safeSourceUrl(record.url);
    link.href = href || '#';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = href ? 'Open the source record' : 'Link withheld';
    item.append(text, link);
    host.appendChild(item);
  }
}

document.querySelector('#favorite').addEventListener('click', () => {
  if (!selectedId) return;
  toggleFavorite(storage, selectedId);
  select(selectedId);
});
document.querySelector('#align-start').addEventListener('click', () => {
  if (!selectedId) return;
  alignFrom = selectedId;
  renderAlignments();
});
document.querySelector('#align-clear').addEventListener('click', () => {
  clearAlignments(storage);
  alignFrom = null;
  drawAlignments();
});
document.querySelector('#export').addEventListener('click', () => {
  const blob = new Blob(
    [JSON.stringify({
      favorites: readFavorites(storage),
      alignments: readAlignments(storage),
    }, null, 2)],
    { type: 'application/json' },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ancient-edition-local.json';
  link.click();
  URL.revokeObjectURL(url);
});
search.addEventListener('input', renderList);
region.addEventListener('change', renderList);
viewer.selectedEntityChanged.addEventListener(() => {
  const id = viewer.selectedEntity?.id;
  if (id && siteById(id)) select(id);
});

const intro = document.querySelector('#intro');
if (sessionStorage.getItem('ancient-intro') === 'dismissed') intro.close();
else intro.showModal();
document.querySelector('#intro-dismiss').addEventListener('click', () => {
  sessionStorage.setItem('ancient-intro', 'dismissed');
  intro.close();
});

function addSourceLink(parent, source) {
  const href = safeSourceUrl(source?.url);
  if (!href) return;
  const link = document.createElement('a');
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = source.name;
  parent.appendChild(link);
}

function renderDiscoveries() {
  document.querySelector('#discoveries-summary').textContent = describeDiscoveries().text;
  const host = document.querySelector('#discoveries');
  host.replaceChildren();
  for (const record of RECENT_DISCOVERIES) {
    const block = document.createElement('article');
    const title = document.createElement('h3');
    title.textContent = record.title;
    const label = document.createElement('p');
    label.className = 'fine';
    label.textContent = DISCOVERY_LABELS[record.listing] || record.listing;
    const place = document.createElement('p');
    const surveyed = record.surveyOrDiscoveryDate
      ? `Survey or field date ${record.surveyOrDiscoveryDate}. `
      : '';
    place.textContent = `${record.place}. ${surveyed}Publication ${record.publicationDate}. Not pinned.`;
    const text = document.createElement('p');
    text.textContent = record.summary;
    const access = document.createElement('p');
    access.className = 'fine';
    access.textContent = record.accessNote;
    block.append(title, label, place, text, access);
    for (const source of record.links || []) addSourceLink(block, source);
    host.appendChild(block);
  }
}

function renderCanyon() {
  const host = document.querySelector('#canyon');
  host.replaceChildren();
  const intro = document.createElement('p');
  intro.className = 'fine';
  intro.textContent =
    'Public traditions are named by nation and page. The 1909 newspaper story is a separate unverified account.';
  host.appendChild(intro);
  for (const note of GRAND_CANYON_NOTES) {
    const block = document.createElement('article');
    const title = document.createElement('h3');
    title.textContent =
      note.kind === 'documented-archaeology'
        ? note.title
        : note.kind === 'indigenous-tradition'
          ? `${note.nation}: ${note.title}`
          : `Unverified newspaper story: ${note.title}`;
    const text = document.createElement('p');
    text.textContent = note.text;
    block.append(title, text);
    for (const source of note.sources || []) addSourceLink(block, source);
    host.appendChild(block);
  }
}

renderList();
renderLidar();
renderDiscoveries();
renderCanyon();
drawAlignments();
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(-60, -15, 12_000_000),
});
loadBasemap();
