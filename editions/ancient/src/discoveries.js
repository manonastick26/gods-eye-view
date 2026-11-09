/**
 * Cited research notes. A headline with no source is not attached to any row.
 * Maya records stay in Mesoamerica. Nothing here is pinned: no primary
 * coordinate was verified for a site marker.
 */

export const RECENT_DISCOVERIES = Object.freeze([
  Object.freeze({
    id: 'valeriana',
    title: 'Valeriana',
    place: 'Campeche, Mexico',
    region: 'mesoamerica',
    culture: 'Maya',
    listing: 'airborne-inference',
    fieldValidated: false,
    surveyOrDiscoveryDate: '2013',
    publicationDate: '2024-10-29',
    pinned: false,
    summary:
      'A 2013 airborne lidar survey flown for forest-carbon monitoring in Campeche was later read for archaeology. The 29 October 2024 Antiquity paper names a dense Maya settlement Valeriana and identifies plazas, pyramids, a ballcourt, and a reservoir. The authors say this reading has not been checked in the field, so it stays an inference.',
    accessNote:
      'The raw point cloud and elevation model are not an open public stream. Access needs permission from Mexico’s National Institute of Anthropology and History (INAH).',
    primaryUrl:
      'https://www.cambridge.org/core/journals/antiquity/article/running-out-of-empty-space-environmental-lidar-and-the-crowded-ancient-landscape-of-campeche-mexico/FFDB435047017853F26CFC5D8804B08D',
    links: Object.freeze([
      Object.freeze({
        name: 'Antiquity paper',
        url: 'https://www.cambridge.org/core/journals/antiquity/article/running-out-of-empty-space-environmental-lidar-and-the-crowded-ancient-landscape-of-campeche-mexico/FFDB435047017853F26CFC5D8804B08D',
      }),
      Object.freeze({
        name: 'Antiquity news note, 29 October 2024',
        url: 'https://www.antiquity.ac.uk/news/2024/have-we-found-all-major-maya-cities-not-even-close-new-research-suggests',
      }),
    ]),
  }),
  Object.freeze({
    id: 'ocomtun',
    title: 'Ocomtún',
    place: 'Campeche, Mexico, Balam Kú–Calakmul reserve landscape',
    region: 'mesoamerica',
    culture: 'Maya',
    listing: 'field-find',
    surveyOrDiscoveryDate: '2023',
    publicationDate: '2026-04-08',
    pinned: false,
    summary:
      'Field crews recorded this center in 2023. Estudios de Cultura Maya dates the peer-reviewed article 8 April 2026; that is the journal date, not a new discovery year. The record describes monumental architecture, stone columns, and causeways, and treats regional importance as an inference. No primary coordinate is used here. A public raw lidar file was not verified, and the place is not listed as open to visitors.',
    accessNote: 'Public raw lidar for this site was not verified.',
    primaryUrl:
      'https://revistas-filologicas.unam.mx/estudios-cultura-maya/index.php/ecm/article/view/1469',
    links: Object.freeze([
      Object.freeze({
        name: 'Estudios de Cultura Maya, 8 April 2026',
        url: 'https://revistas-filologicas.unam.mx/estudios-cultura-maya/index.php/ecm/article/view/1469',
      }),
      Object.freeze({
        name: 'BBC News, 21 June 2023',
        url: 'https://www.bbc.com/news/world-latin-america-65974439',
      }),
    ]),
  }),
  Object.freeze({
    id: 'dzibanche',
    title: 'Dzibanché / Kaanu’l',
    place: 'Quintana Roo, Mexico',
    region: 'mesoamerica',
    culture: 'Maya',
    listing: 'new-reading',
    notNewCity: true,
    surveyOrDiscoveryDate: '2017',
    publicationDate: '2025-10-07',
    pinned: false,
    summary:
      'Dzibanché was already a known city. A 2017 lidar flight for INAH, written up on 7 October 2025, is used to describe a wider settlement with causeways and reservoirs. This is a new reading of a known city, not a report of a city just found.',
    accessNote: 'An open copy of the raw survey is not confirmed.',
    primaryUrl:
      'https://www.cambridge.org/core/journals/latin-american-antiquity/article/closer-look-at-classic-maya-urbanism-at-dzibanchekaanul-through-airborne-lidar-mapping/B0B6872DD1A4AE10E30C9BE023A7F782',
    links: Object.freeze([
      Object.freeze({
        name: 'Latin American Antiquity, 7 October 2025',
        url: 'https://www.cambridge.org/core/journals/latin-american-antiquity/article/closer-look-at-classic-maya-urbanism-at-dzibanchekaanul-through-airborne-lidar-mapping/B0B6872DD1A4AE10E30C9BE023A7F782',
      }),
    ]),
  }),
  Object.freeze({
    id: 'naachtun',
    title: 'Naachtun wetlands',
    place: 'Petén, Guatemala',
    region: 'mesoamerica',
    culture: 'Maya',
    listing: 'published-study',
    notNewCity: true,
    surveyOrDiscoveryDate: null,
    publicationDate: '2024-04-01',
    pinned: false,
    summary:
      'A Geoarchaeology paper published online on 1 April 2024, with a print issue in September 2024, uses lidar and fieldwork around the known city of Naachtun. It describes wetland farming works: reservoirs, raised fields, and canals. This is a study of that landscape, not a new-city announcement.',
    accessNote: 'An open raw stream of the survey was not verified.',
    primaryUrl: 'https://doi.org/10.1002/gea.22003',
    links: Object.freeze([
      Object.freeze({
        name: 'Geoarchaeology, doi:10.1002/gea.22003',
        url: 'https://doi.org/10.1002/gea.22003',
      }),
    ]),
  }),
]);

const REGIONS = new Set([
  'africa',
  'asia',
  'europe',
  'mesoamerica',
  'oceania',
  'south-america',
]);

const LISTINGS = new Set([
  'airborne-inference',
  'field-find',
  'new-reading',
  'published-study',
]);

export function discoveryErrors(record, nowYear = 2026) {
  const errors = [];
  if (!record || typeof record !== 'object') return ['Discovery record is missing'];
  for (const key of ['id', 'title', 'place', 'region', 'listing', 'publicationDate', 'primaryUrl', 'summary']) {
    if (!record[key]) errors.push(`Missing ${key}`);
  }
  if (record.listing && !LISTINGS.has(record.listing)) errors.push('Unknown listing');
  if (record.region && !REGIONS.has(record.region)) errors.push('Unknown region');
  if (/maya|mayan/i.test(`${record.culture || ''} ${record.title || ''} ${record.summary || ''}`) && record.region !== 'mesoamerica')
    errors.push('A Maya site is not in South America');
  if (record.pinned) errors.push('This pack does not pin a site');
  if (record.lat != null || record.lon != null || record.coordinates)
    errors.push('No coordinate is stored');
  if (record.listing === 'airborne-inference' && record.fieldValidated !== false)
    errors.push('An airborne inference must say it is not field-checked');
  if ((record.listing === 'new-reading' || record.listing === 'published-study') && record.notNewCity !== true)
    errors.push('A study of a known place must not be filed as a new city');
  if (record.listing !== 'published-study' && !record.surveyOrDiscoveryDate)
    errors.push('Missing surveyOrDiscoveryDate');
  const published = Number(String(record.publicationDate || '').slice(0, 4));
  const found = Number(String(record.surveyOrDiscoveryDate || '').slice(0, 4));
  if (!Number.isFinite(published)) errors.push('Publication date needs a year');
  if (record.surveyOrDiscoveryDate && !Number.isFinite(found))
    errors.push('Survey date needs a year');
  if (record.listing === 'field-find' && Number.isFinite(found) && nowYear - found > 30)
    errors.push('An older find is not listed as a recent discovery');
  if (record.listing === 'field-find' && Number.isFinite(found) && found === published)
    errors.push('Do not use the journal year as the field-discovery year');
  if (Number.isFinite(published) && Number.isFinite(found) && published + 1 < found)
    errors.push('Publication cannot predate the discovery year');
  if (/untouched mayan city/i.test(`${record.title || ''} ${record.summary || ''}`))
    errors.push('Do not attach an unsourced headline');
  const urls = [record.primaryUrl, ...(record.links || []).map((link) => link.url)];
  for (const value of urls) {
    try {
      const url = new URL(String(value || ''));
      if (url.protocol !== 'https:') errors.push('Primary source must be https');
    } catch {
      errors.push('Primary source link is not a URL');
    }
  }
  return errors;
}

export function describeDiscoveries(records = RECENT_DISCOVERIES) {
  const errors = records.flatMap((record, index) =>
    discoveryErrors(record).map((error) => `#${index}: ${error}`),
  );
  if (errors.length) return { status: 'invalid', text: errors.join(' ') };
  if (!records.length) {
    return {
      status: 'none',
      text: 'No verified recent research is listed. A headline without a source is not added.',
    };
  }
  return {
    status: 'listed',
    text: `${records.length} cited records from Mexico and Guatemala. None is pinned. An unsourced headline is not matched to any of them.`,
  };
}

export const DISCOVERY_LABELS = Object.freeze({
  'airborne-inference': 'Airborne inference, not field-checked',
  'field-find': 'Field find; the journal date is later',
  'new-reading': 'Known city, later mapping paper',
  'published-study': 'Published study of a known place',
});
