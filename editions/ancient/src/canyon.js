/**
 * Grand Canyon notes.
 * Public traditions are attributed to a named nation and a public page.
 * The 1909 newspaper story is a separate unverified account.
 */

export const CANYON_KINDS = Object.freeze([
  'documented-archaeology',
  'indigenous-tradition',
  'unverified-legend',
]);

export const GRAND_CANYON_NOTES = Object.freeze([
  Object.freeze({
    kind: 'documented-archaeology',
    nation: null,
    title: 'People and associated tribes',
    text: 'The National Park Service people page describes human presence at the canyon from about 10,000 years ago through today. Its associated-tribes page names the tribes with cultural ties there. The notes below are separate public tellings, not one account assigned to every tribe.',
    sources: Object.freeze([
      Object.freeze({
        name: 'Grand Canyon National Park, People',
        url: 'https://www.nps.gov/grca/learn/historyculture/people.htm',
      }),
      Object.freeze({
        name: 'Grand Canyon National Park, Associated Tribes',
        url: 'https://www.nps.gov/grca/learn/historyculture/associated-tribes.htm',
      }),
    ]),
  }),
  Object.freeze({
    kind: 'indigenous-tradition',
    nation: 'Hopi',
    title: 'Hopi emergence',
    text: 'The park’s Sacred Canyon page describes the Hopi Sipapuni as the emergence place in this tradition and associates it with the canyon and the confluence landscape. No point is marked for it.',
    sources: Object.freeze([
      Object.freeze({
        name: 'Grand Canyon National Park, Sacred Canyon',
        url: 'https://www.nps.gov/grca/learn/historyculture/sacred-canyon.htm',
      }),
    ]),
  }),
  Object.freeze({
    kind: 'indigenous-tradition',
    nation: 'A:shiwi (Zuni)',
    title: 'A:shiwi emergence and migration',
    text: 'In a Grand Canyon Trust interview, Jim Enote describes an A:shiwi (Zuni) tradition: emergence in the Grand Canyon, a long stay there, travel along Colorado River tributaries, and a later settlement at Zuni. He names that emergence Chimik’yana’kya dey’a. This is his public telling, and it is not placed on the map.',
    sources: Object.freeze([
      Object.freeze({
        name: 'Grand Canyon Trust, Jim Enote',
        url: 'https://www.grandcanyontrust.org/blog/jim-enote-zuni-grand-canyon-origins/',
      }),
    ]),
  }),
  Object.freeze({
    kind: 'indigenous-tradition',
    nation: 'Hualapai',
    title: 'Hualapai emergence and migration',
    text: 'A Grand Canyon history page presents a Hualapai tradition that connects emergence with Spirit Mountain, life along the Colorado River, and a later move onto the plateau. Spirit Mountain is not given a coordinate here.',
    sources: Object.freeze([
      Object.freeze({
        name: 'Grand Canyon History, Hualapai',
        url: 'https://grcahistory.org/history/native-cultures/hualapai/',
      }),
    ]),
  }),
  Object.freeze({
    kind: 'indigenous-tradition',
    nation: 'Havasupai',
    title: 'Havasupai, the canyon as a whole',
    text: 'The park’s Sacred Canyon page cites Havasupai elder Rex Tilousi for the view that the canyon as a whole is sacred. The page is the source; the canyon is not reduced to a pin.',
    sources: Object.freeze([
      Object.freeze({
        name: 'Grand Canyon National Park, Sacred Canyon',
        url: 'https://www.nps.gov/grca/learn/historyculture/sacred-canyon.htm',
      }),
    ]),
  }),
  Object.freeze({
    kind: 'unverified-legend',
    nation: null,
    title: '1909 newspaper story',
    text: 'On 5 April 1909 the Arizona Gazette ran “Explorations in the Grand Canyon,” an account of an Egyptian cave and a Smithsonian-backed expedition it links to G. E. Kinkaid (also spelled Kincaid) and Prof. S. A. Jordan. Pima County Public Library’s public note says that expedition story does not hold. Discover Magazine reports a Smithsonian Department of Anthropology reply that a file search found no match for those names or for an Egyptian civilization in Arizona. No corroborating expedition record is cited on either page. A cover-up is not established. This story is not archaeology and is separate from the traditions above.',
    sources: Object.freeze([
      Object.freeze({
        name: 'Pima County Public Library',
        url: 'https://www.library.pima.gov/content/grand-canyon-and-egyptian-artifacts/',
      }),
      Object.freeze({
        name: 'Discover Magazine',
        url: 'https://www.discovermagazine.com/no-egyptian-artifacts-were-never-found-in-the-grand-canyon-44993',
      }),
    ]),
  }),
]);

export function canyonErrors(record) {
  const errors = [];
  if (!CANYON_KINDS.includes(record?.kind)) errors.push('Unknown canyon note kind');
  if (!record?.text) errors.push('Missing text');
  const sources = record?.sources || [];
  if (!sources.length) errors.push('Missing public source');
  for (const source of sources) {
    try {
      const url = new URL(String(source?.url || ''));
      if (url.protocol !== 'https:') errors.push('Source must be https');
    } catch {
      errors.push('Source link is not a URL');
    }
  }
  if (record?.kind === 'indigenous-tradition') {
    if (!record.nation) errors.push('A tradition needs the nation it is attributed to');
    if (/\b(myth|legend|hoax|fiction|misinformation)\b/i.test(`${record.title} ${record.text}`))
      errors.push('A public tradition is not labeled as fiction');
  }
  if (record?.kind === 'unverified-legend') {
    if (/\b(debunk|hoax|misinformation)\b/i.test(record.text || ''))
      errors.push('Keep the newspaper note neutral');
    if (/confirmed cave|proven expedition|cover-?up is (real|proven|confirmed)/i.test(record.text || ''))
      errors.push('An unverified story must not be stated as proven');
  }
  if (record?.lat != null || record?.lon != null) errors.push('No canyon coordinate is stored');
  return errors;
}
