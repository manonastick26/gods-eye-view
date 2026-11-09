/**
 * South America LiDAR catalog for the ancient edition.
 *
 * No dataset is attached. Bounds, file URLs, acquisition dates, and licenses
 * are left empty on purpose until a verified open source is supplied.
 * Generic imagery and ellipsoid terrain are not entries in this catalog.
 */

export const LIDAR_KINDS = Object.freeze([
  'airborne-point-cloud',
  'airborne-dtm',
  'satellite-sparse',
  'not-lidar-terrain',
  'unavailable',
]);

export const MODEL_KINDS = Object.freeze([
  'photogrammetry-mesh',
  'scan-derived',
  'hypothetical-reconstruction',
  'unavailable',
]);

/**
 * External catalogs only. `rendered` is false: nothing here is drawn as a scan.
 * Checked against Zenodo, the AWS open-data registry, the NASA dataset page,
 * and the CAST page on 9 Nov 2026. State ZIPs were not downloaded.
 */
export const SOUTH_AMERICA_LIDAR = Object.freeze([
  Object.freeze({
    id: 'eba-transect-outlines',
    title: 'EBA Amazon airborne LiDAR transect outlines',
    kind: 'airborne-point-cloud',
    status: 'external-link',
    rendered: false,
    format: 'shapefile-zip',
    acquisitionStart: '2016',
    acquisitionEnd: '2018',
    acquisitionNote:
      'The Zenodo description says the EBA project collected the transects between 2016 and 2018. It does not give one day for every flight.',
    publicationDate: '2021-06-16',
    coverage:
      'Brazilian Amazon transects, about 12.5 km by 300 m each, not a continuous map of the Amazon and not the latest continent-wide coverage.',
    resolutionNote:
      'Described average density about 4 returns per square metre, footprint under 30 cm, flying height 600 m. Outlines are locations and metrics, not the point cloud.',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    provenance: 'INPE EBA project, Zenodo record 10.5281/zenodo.4968648',
    url: 'https://zenodo.org/records/4968648',
    bytes: 21319159,
    bytesNote: 'Outline ZIP size reported by the Zenodo API. Not downloaded into this edition.',
    siteAssociation: 'none',
    note: 'Metadata and outline link only. Not drawn on the globe and not tied to a monument marker.',
  }),
  Object.freeze({
    id: 'eba-acre-rondonia',
    title: 'EBA discrete airborne LiDAR, Acre and Rondônia',
    kind: 'airborne-point-cloud',
    status: 'external-link',
    rendered: false,
    format: 'laz-zip',
    acquisitionStart: '2016',
    acquisitionEnd: '2018',
    acquisitionNote: 'Same EBA flight years as the outline record. This file set does not repeat a per-flight day.',
    publicationDate: '2023-03-01',
    coverage: 'Acre and Rondônia transect ZIPs. Not continuous state coverage.',
    resolutionNote: 'Point clouds. Not opened here.',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    provenance: 'INPE EBA, Zenodo 10.5281/zenodo.7689909',
    url: 'https://zenodo.org/records/7689909',
    bytes: null,
    bytesNote: 'Zenodo lists multi-gigabyte ZIPs (Acre about 5 GB, Rondônia about 16 GB). Not downloaded.',
    siteAssociation: 'none',
    note: 'External download only. Not a scan of Machu Picchu or any marker in this app.',
  }),
  Object.freeze({
    id: 'eba-mt-am-pa',
    title: 'EBA discrete airborne LiDAR, Mato Grosso, Amazonas, and Pará',
    kind: 'airborne-point-cloud',
    status: 'external-link',
    rendered: false,
    format: 'laz-zip',
    acquisitionStart: '2016',
    acquisitionEnd: '2018',
    acquisitionNote: 'EBA flight years 2016–2018. Publication is not the flight date.',
    publicationDate: '2023-02-13',
    coverage: 'Transect ZIPs for those three states, split into parts. Not a full-state surface.',
    resolutionNote: 'Point clouds. Not opened here.',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    provenance: 'INPE EBA, Zenodo 10.5281/zenodo.7636454',
    url: 'https://zenodo.org/records/7636454',
    bytes: null,
    bytesNote: 'Zenodo lists multi-gigabyte part ZIPs, tens of GB for some parts. Not downloaded.',
    siteAssociation: 'none',
    note: 'External download only.',
  }),
  Object.freeze({
    id: 'eba-rr-ap',
    title: 'EBA discrete airborne LiDAR, Roraima and Amapá',
    kind: 'airborne-point-cloud',
    status: 'external-link',
    rendered: false,
    format: 'laz-zip',
    acquisitionStart: '2016',
    acquisitionEnd: '2018',
    acquisitionNote: 'EBA flight years 2016–2018.',
    publicationDate: '2023-03-01',
    coverage: 'Roraima and Amapá transect ZIPs. Not continuous coverage.',
    resolutionNote: 'Point clouds. Not opened here.',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    provenance: 'INPE EBA, Zenodo 10.5281/zenodo.7689693',
    url: 'https://zenodo.org/records/7689693',
    bytes: null,
    bytesNote: 'Zenodo lists about 11 GB (Roraima) and about 6.7 GB (Amapá). Not downloaded.',
    siteAssociation: 'none',
    note: 'External download only.',
  }),
  Object.freeze({
    id: 'eba-ma-to',
    title: 'EBA discrete airborne LiDAR, Maranhão and Tocantins',
    kind: 'airborne-point-cloud',
    status: 'external-link',
    rendered: false,
    format: 'laz-zip',
    acquisitionStart: '2016',
    acquisitionEnd: '2018',
    acquisitionNote: 'EBA flight years 2016–2018.',
    publicationDate: '2023-03-01',
    coverage: 'Maranhão and Tocantins transect ZIPs. Not continuous coverage.',
    resolutionNote: 'Point clouds. Not opened here.',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    provenance: 'INPE EBA, Zenodo 10.5281/zenodo.7689210',
    url: 'https://zenodo.org/records/7689210',
    bytes: null,
    bytesNote: 'Zenodo lists about 5.2 GB (Maranhão) and about 229 MB (Tocantins). Not downloaded.',
    siteAssociation: 'none',
    note: 'External download only. The smaller Tocantins ZIP was still not fetched.',
  }),
  Object.freeze({
    id: 'pmsp-2017',
    title: 'São Paulo city airborne LiDAR, 2017',
    kind: 'airborne-point-cloud',
    status: 'external-link',
    rendered: false,
    format: 'laz-and-ept',
    acquisitionStart: '2017',
    acquisitionEnd: '2017',
    acquisitionNote:
      'The AWS registry says the initial survey was acquired in 2017. It does not give a month or day on the page checked here.',
    publicationDate: null,
    coverage:
      'Municipality of São Paulo urban mapping. Not an Amazon archaeology survey and not attached to a monument marker.',
    resolutionNote:
      'LAZ in bucket laz-m3dc-pmsp and Entwine Point Tiles in ept-m3dc-pmsp. EPT is not Cesium 3D Tiles, and this viewer does not stream it.',
    license: 'GPL-3.0 as listed on the AWS open-data registry',
    licenseUrl: 'https://www.gnu.org/licenses/gpl-3.0.html',
    provenance:
      'Prefeitura Municipal de São Paulo, registry.opendata.aws/pmsp-lidar, documentation https://github.com/geoinfo-smdu/M3DC',
    url: 'https://registry.opendata.aws/pmsp-lidar/',
    bytes: null,
    bytesNote: 'City-scale clouds. Not downloaded. No AWS account was used.',
    siteAssociation: 'none',
    note: 'Registry license line was GPL-3.0 on the page checked 9 Nov 2026. Re-read attribution before any reuse beyond this link. Not rendered.',
  }),
  Object.freeze({
    id: 'gedi-l2a',
    title: 'NASA GEDI L2A footprint elevation and height metrics',
    kind: 'satellite-sparse',
    status: 'external-link',
    rendered: false,
    format: 'gedi-l2a',
    acquisitionStart: null,
    acquisitionEnd: null,
    acquisitionNote:
      'This edition did not open a user guide or a granule, so no acquisition day is copied here. The dataset is sparse spaceborne footprints, not a dense bare-earth model.',
    publicationDate: null,
    coverage: 'Global footprint product (v003 page title). Not a South America wall-to-wall ground model.',
    resolutionNote:
      'Sparse ISS LiDAR footprints. Not loaded. An Earthdata login is typical, and this edition adds no account.',
    license: 'Not restated here; see the NASA dataset page before reuse',
    licenseUrl: 'https://data.nasa.gov/dataset/gedi-l2a-elevation-and-height-metrics-data-global-footprint-level-v003',
    provenance: 'NASA GEDI L2A, data.nasa.gov dataset 9077c18c-8602-4e1d-8bd8-79599083d8e4',
    url: 'https://data.nasa.gov/dataset/9077c18c-8602-4e1d-8bd8-79599083d8e4',
    bytes: null,
    bytesNote: 'No granule downloaded.',
    siteAssociation: 'none',
    note: 'Context link only. Not a scan of a monument and not drawn.',
  }),
]);

const LIDAR_SCAN_KINDS = new Set([
  'airborne-point-cloud',
  'airborne-dtm',
  'satellite-sparse',
]);

export function lidarRecordErrors(record) {
  const errors = [];
  if (!record || typeof record !== 'object') return ['LiDAR record is missing'];
  if (!LIDAR_KINDS.includes(record.kind)) errors.push('Unknown LiDAR kind');
  if (record.kind === 'not-lidar-terrain' && record.status === 'available')
    errors.push('Generic terrain cannot be offered as a LiDAR scan');
  if (record.status === 'external-link') {
    if (record.rendered !== false)
      errors.push('A linked catalog row is not a rendered scan');
    for (const key of ['provenance', 'license', 'url', 'coverage']) {
      if (!record[key]) errors.push(`Linked LiDAR needs ${key}`);
    }
  }
  if (record.format === 'ept' || record.format === 'laz-and-ept') {
    /* EPT is recorded as a format name, not as Cesium 3D Tiles. */
  }
  if (record.status === 'available') {
    if (!LIDAR_SCAN_KINDS.has(record.kind))
      errors.push('Only an actual LiDAR kind can be marked available');
    for (const key of ['provenance', 'license', 'coverage', 'url']) {
      if (!record[key]) errors.push(`Available LiDAR needs ${key}`);
    }
    if (!record.acquisitionDate)
      errors.push('Available LiDAR needs an acquisition date, separate from publication');
    if (record.publicationDate && record.acquisitionDate === record.publicationDate)
      errors.push('Acquisition date and publication date must stay distinct fields');
  }
  return errors;
}

export function describeLidarCatalog(records = SOUTH_AMERICA_LIDAR) {
  const errors = records.flatMap((record, index) =>
    lidarRecordErrors(record).map((error) => `#${index}: ${error}`),
  );
  if (errors.length) {
    return {
      status: 'invalid',
      rendered: false,
      title: 'LiDAR catalog is not usable',
      detail: errors.join(' '),
      count: 0,
    };
  }
  if (!records.length) {
    return {
      status: 'unavailable',
      rendered: false,
      title: 'No verified South America LiDAR dataset is attached',
      detail:
        'Satellite imagery and the plain ellipsoid are not LiDAR, and they are not a scan of a buried or jungle-covered building.',
      count: 0,
    };
  }
  return {
    status: 'linked',
    rendered: false,
    title: `${records.length} LiDAR records linked, none drawn`,
    detail:
      'These are external downloads or catalog pages. The globe is not showing their points. Imagery and the ellipsoid are still not scans. A ground return only supports what that dataset’s date and spacing actually measured.',
    count: records.length,
  };
}

export function modelRecordErrors(record) {
  const errors = [];
  if (!record || typeof record !== 'object') return ['Model record is missing'];
  if (!MODEL_KINDS.includes(record.status)) errors.push('Unknown model status');
  if (record.status === 'hypothetical-reconstruction' && record.url)
    errors.push('A hypothetical reconstruction is not loaded as a measured model');
  if (record.status === 'photogrammetry-mesh' || record.status === 'scan-derived') {
    if (!record.url || !record.license || !record.source)
      errors.push('A measured model needs a url, license, and source');
    if (!['gltf', '3d-tiles'].includes(record.format))
      errors.push('This viewer can load glTF or 3D Tiles only');
  }
  if (record.format === 'copc')
    errors.push('COPC point clouds are not decoded by the bundled Cesium build');
  return errors;
}

/**
 * What the globe is allowed to draw for a model record.
 * Imagery, terrain, and boxes are never a successful model load.
 */
export function modelLoadPlan(record) {
  const errors = modelRecordErrors(record || { status: 'unavailable' });
  if (!record || record.status === 'unavailable' || !record.url) {
    return {
      action: 'none',
      reason: 'No measured 3D model is attached.',
    };
  }
  if (errors.length) {
    return { action: 'none', reason: errors[0] };
  }
  if (record.format === 'gltf') return { action: 'gltf', url: record.url };
  if (record.format === '3d-tiles') return { action: '3d-tiles', url: record.url };
  return { action: 'none', reason: 'No supported measured model is attached.' };
}

/** CAST Machu Picchu meshes. Page checked 9 Nov 2026. Not bundled. */
export const MONUMENT_MODEL_NOTES = Object.freeze([
  Object.freeze({
    siteId: 'machu-picchu',
    rendered: false,
    acquisitionNote: 'The page says CAST scanned with an Optech ILRIS-3D in 2005 and 2009.',
    formatNote:
      'The page offers Polyworks PWZIP projects and OBJ meshes through map placemarkers. No direct modest file URL was in the HTML.',
    licenseNote:
      'The article links CC BY-NC 3.0 and says the data are not for commercial use without approval. The page meta tags say CC BY-NC-SA 3.0. Neither is MIT. This edition does not relicense them.',
    url: 'https://gmv.cast.uark.edu/scanning-2/data/machu-picchu-3d-data/',
    note: 'Metadata only. No mesh was downloaded or drawn.',
  }),
]);

export function modelNoteFor(siteId) {
  return MONUMENT_MODEL_NOTES.find((item) => item.siteId === siteId) || null;
}
