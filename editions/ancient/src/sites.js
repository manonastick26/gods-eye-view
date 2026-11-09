/**
 * Curated monument markers for the ancient-structures edition.
 *
 * Coordinates are approximate published site centers, rounded to four decimal
 * degrees (about 11 m). They are not a new survey and not LiDAR returns.
 * Dates are scholarly ranges, not a single construction day.
 * UNESCO list pages identify the heritage record; they were not re-fetched
 * while this catalog was written.
 */

export const REGIONS = Object.freeze([
  'africa',
  'asia',
  'europe',
  'mesoamerica',
  'oceania',
  'south-america',
]);

const UNESCO = 'UNESCO World Heritage Centre';

function site(entry) {
  return Object.freeze({
    ...entry,
    model: Object.freeze({
      status: 'unavailable',
      format: null,
      url: null,
      license: null,
      source: null,
      note: 'No openly licensed measured 3D model is bundled for this place.',
    }),
    lidar: Object.freeze({
      status: 'unavailable',
      kind: 'unavailable',
      acquisitionDate: null,
      publicationDate: null,
      resolutionM: null,
      coverage: null,
      provenance: null,
      license: null,
      bounds: null,
      url: null,
      note: 'No verified LiDAR dataset is attached. Imagery and the ellipsoid are not a scan of this structure.',
    }),
  });
}

export const ANCIENT_SITES = Object.freeze([
  site({
    id: 'stonehenge',
    name: 'Stonehenge',
    country: 'United Kingdom',
    region: 'europe',
    culture: 'Late Neolithic and early Bronze Age communities in Britain',
    type: 'Stone circle and earthworks',
    periodLabel: 'about 3000–1600 BCE',
    periodNote:
      'The earthwork, bluestones, and sarsen settings belong to different stages. This is a range, not one construction date.',
    lat: 51.1789,
    lon: -1.8262,
    coordinateNote:
      'Approximate center of the stone circle, rounded to four decimal degrees.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/373',
  }),
  site({
    id: 'giza-great-pyramid',
    name: 'Great Pyramid of Giza',
    country: 'Egypt',
    region: 'africa',
    culture: 'Ancient Egyptian, Fourth Dynasty',
    type: 'Pyramid tomb',
    periodLabel: 'about 2600 BCE',
    periodNote:
      'Commonly associated with Khufu. The century is approximate; the marker is one pyramid inside the wider Memphis necropolis.',
    lat: 29.9792,
    lon: 31.1342,
    coordinateNote:
      'Approximate center of the Great Pyramid, not the whole Giza–Dahshur property.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/86',
  }),
  site({
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'south-america',
    culture: 'Inca',
    type: 'Ridge citadel',
    periodLabel: '15th century CE',
    periodNote:
      'Inca construction in the 1400s. Occupation was short compared with many older sites. The exact start year is not pinned here.',
    lat: -13.1631,
    lon: -72.545,
    coordinateNote:
      'Approximate center of the citadel ridge, rounded to four decimal degrees.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/274',
  }),
  site({
    id: 'sacsayhuaman',
    name: 'Sacsayhuamán',
    country: 'Peru',
    region: 'south-america',
    culture: 'Inca',
    type: 'Hilltop stone complex',
    periodLabel: '15th–16th centuries CE',
    periodNote:
      'The visible Inca walls belong to the late Inca period. Earlier use of the hill is a separate question and is not dated here.',
    lat: -13.508,
    lon: -71.9817,
    coordinateNote:
      'Approximate center of the fortress walls above Cusco, not the whole City of Cusco property.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/273',
  }),
  site({
    id: 'tiwanaku',
    name: 'Tiwanaku',
    country: 'Bolivia',
    region: 'south-america',
    culture: 'Tiwanaku',
    type: 'Ceremonial stone center',
    periodLabel: 'about 500–1000 CE',
    periodNote:
      'The main monumental period is roughly the second half of the first millennium CE. Earlier and later activity exists; this is not a single year.',
    lat: -16.5547,
    lon: -68.6734,
    coordinateNote:
      'Approximate center of the ceremonial core near the Kalasasaya.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/567',
  }),
  site({
    id: 'chichen-itza',
    name: 'Chichén Itzá',
    country: 'Mexico',
    region: 'mesoamerica',
    culture: 'Maya',
    type: 'City and temple precinct',
    periodLabel: 'about 8th–11th centuries CE',
    periodNote:
      'The famous northern buildings are mostly Terminal Classic to early Postclassic. The city was used over a longer span.',
    lat: 20.6843,
    lon: -88.5678,
    coordinateNote:
      'Approximate center of El Castillo (the main pyramid), not every outlying group.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/483',
  }),
  site({
    id: 'teotihuacan',
    name: 'Teotihuacan',
    country: 'Mexico',
    region: 'mesoamerica',
    culture: 'Teotihuacan',
    type: 'Planned city and pyramids',
    periodLabel: 'about 100–550 CE',
    periodNote:
      'The city’s height is roughly the first half of the first millennium CE. Pyramid building phases are earlier and later than any one date.',
    lat: 19.6925,
    lon: -98.8435,
    coordinateNote:
      'Approximate center along the Avenue of the Dead, near the Pyramid of the Sun.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/414',
  }),
  site({
    id: 'petra',
    name: 'Petra',
    country: 'Jordan',
    region: 'asia',
    culture: 'Nabataean',
    type: 'Rock-cut city',
    periodLabel: 'about 4th century BCE–2nd century CE',
    periodNote:
      'Nabataean Petra becomes prominent in the last centuries BCE and the early centuries CE. Many façades are not one building campaign.',
    lat: 30.3285,
    lon: 35.4444,
    coordinateNote:
      'Approximate center near the Treasury approach, inside a much larger city.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/326',
  }),
  site({
    id: 'angkor-wat',
    name: 'Angkor Wat',
    country: 'Cambodia',
    region: 'asia',
    culture: 'Khmer',
    type: 'Temple mountain',
    periodLabel: 'early 12th century CE',
    periodNote:
      'Angkor Wat is generally placed in the early 1100s, under Suryavarman II. The wider Angkor landscape is much older and later.',
    lat: 13.4125,
    lon: 103.867,
    coordinateNote:
      'Approximate center of the Angkor Wat enclosure, not the whole Angkor park.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/668',
  }),
  site({
    id: 'acropolis-athens',
    name: 'Acropolis of Athens',
    country: 'Greece',
    region: 'europe',
    culture: 'Ancient Greek',
    type: 'Citadel and temples',
    periodLabel: '5th century BCE for the main marble temples',
    periodNote:
      'The Parthenon and its neighbors are mostly mid-to-late 5th century BCE. The hill was a citadel long before that.',
    lat: 37.9715,
    lon: 23.7267,
    coordinateNote: 'Approximate center of the citadel plateau.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/404',
  }),
  site({
    id: 'gobekli-tepe',
    name: 'Göbekli Tepe',
    country: 'Türkiye',
    region: 'asia',
    culture: 'Pre-Pottery Neolithic',
    type: 'Stone enclosures',
    periodLabel: 'about 9600–8200 BCE',
    periodNote:
      'Radiocarbon work places the monumental enclosures in a long early Holocene span. Pillars were not all raised in one year.',
    lat: 37.2231,
    lon: 38.9224,
    coordinateNote: 'Approximate center of the excavated mound.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/1572',
  }),
  site({
    id: 'newgrange',
    name: 'Newgrange',
    country: 'Ireland',
    region: 'europe',
    culture: 'Neolithic passage-tomb builders',
    type: 'Passage tomb',
    periodLabel: 'about 3200 BCE',
    periodNote:
      'Often placed near 3200 BCE. That is a rounded archaeological estimate for the tomb, within the wider Brú na Bóinne complex.',
    lat: 53.6947,
    lon: -6.4754,
    coordinateNote: 'Approximate center of the Newgrange mound, not Knowth or Dowth.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/659',
  }),
  site({
    id: 'great-zimbabwe',
    name: 'Great Zimbabwe',
    country: 'Zimbabwe',
    region: 'africa',
    culture: 'Shona / Zimbabwe tradition',
    type: 'Dry-stone city',
    periodLabel: 'about 11th–15th centuries CE',
    periodNote:
      'The stone city flourished in the early second millennium CE. Walls were rebuilt and extended; there is no single founding day here.',
    lat: -20.2686,
    lon: 30.9309,
    coordinateNote: 'Approximate center of the Hill Complex and Great Enclosure area.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/364',
  }),
  site({
    id: 'ggantija',
    name: 'Ġgantija',
    country: 'Malta',
    region: 'europe',
    culture: 'Maltese temple period',
    type: 'Megalithic temple',
    periodLabel: 'about 3600–3200 BCE',
    periodNote:
      'Ġgantija is one of the older Maltese temples. The UNESCO property includes other temples on Malta and Gozo with their own ranges.',
    lat: 36.0469,
    lon: 14.2694,
    coordinateNote: 'Approximate center of the Ġgantija temple on Gozo.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/132',
  }),
  site({
    id: 'ahu-tongariki',
    name: 'Ahu Tongariki',
    country: 'Chile',
    region: 'oceania',
    culture: 'Rapa Nui',
    type: 'Stone platform and moai',
    periodLabel: 'about 1250–1500 CE',
    periodNote:
      'Moai carving on Rapa Nui is generally placed in the centuries before European contact. Individual statues were not all carved together. Rapa Nui is Polynesia, not the South American mainland, though the island is Chilean.',
    lat: -27.1258,
    lon: -109.2769,
    coordinateNote:
      'Approximate center of Ahu Tongariki. Other ahu on the island are different places.',
    sourceName: UNESCO,
    sourceUrl: 'https://whc.unesco.org/en/list/715',
  }),
]);

const REQUIRED = [
  'id',
  'name',
  'country',
  'region',
  'culture',
  'type',
  'periodLabel',
  'periodNote',
  'lat',
  'lon',
  'coordinateNote',
  'sourceName',
  'sourceUrl',
];

/** @param {object} record */
export function siteErrors(record) {
  const errors = [];
  if (!record || typeof record !== 'object') return ['Site record is missing'];
  for (const key of REQUIRED) {
    if (record[key] === undefined || record[key] === null || record[key] === '')
      errors.push(`Missing ${key}`);
  }
  if (!REGIONS.includes(record.region)) errors.push('Unknown region');
  if (!Number.isFinite(record.lat) || record.lat < -90 || record.lat > 90)
    errors.push('Latitude out of range');
  if (!Number.isFinite(record.lon) || record.lon < -180 || record.lon > 180)
    errors.push('Longitude out of range');
  const period = String(record.periodLabel || '');
  if (!/about|century|–|—|-/i.test(period))
    errors.push('Period must be a range or an explicit approximation');
  return errors;
}

/** @param {readonly object[]} sites */
export function catalogErrors(sites = ANCIENT_SITES) {
  const errors = [];
  const ids = new Set();
  for (const record of sites) {
    errors.push(...siteErrors(record).map((error) => `${record?.id || '?'}: ${error}`));
    if (ids.has(record.id)) errors.push(`${record.id}: duplicate id`);
    ids.add(record.id);
    if (record.model?.url || record.model?.status === 'available')
      errors.push(`${record.id}: bundled catalog must not claim a 3D model`);
    if (record.lidar?.url || record.lidar?.status === 'available')
      errors.push(`${record.id}: bundled catalog must not claim a LiDAR dataset`);
  }
  return errors;
}

export function filterSites(sites, { query = '', region = 'all' } = {}) {
  const needle = String(query || '').trim().toLowerCase();
  return sites.filter((record) => {
    if (region !== 'all' && record.region !== region) return false;
    if (!needle) return true;
    const haystack = [record.name, record.country, record.culture, record.type, record.periodLabel]
      .join(' ')
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function siteById(id, sites = ANCIENT_SITES) {
  return sites.find((record) => record.id === id) || null;
}
