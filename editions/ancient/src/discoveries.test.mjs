import assert from 'node:assert/strict';
import test from 'node:test';
import { canyonErrors, GRAND_CANYON_NOTES } from './canyon.js';
import { safeSourceUrl } from './content.js';
import {
  RECENT_DISCOVERIES,
  describeDiscoveries,
  discoveryErrors,
} from './discoveries.js';

test('cited research stays unpinned and is not an unsourced headline', () => {
  assert.equal(describeDiscoveries().status, 'listed');
  assert.match(describeDiscoveries().text, /unsourced headline is not matched/);
  assert.equal(RECENT_DISCOVERIES.length, 4);
  const ids = RECENT_DISCOVERIES.map((record) => record.id);
  assert.deepEqual(ids, ['valeriana', 'ocomtun', 'dzibanche', 'naachtun']);
  for (const record of RECENT_DISCOVERIES) {
    assert.deepEqual(discoveryErrors(record), []);
    assert.equal(record.region, 'mesoamerica');
    assert.equal(record.pinned, false);
    assert.equal(record.lat, undefined);
    assert.equal(safeSourceUrl(record.primaryUrl), record.primaryUrl);
    assert.doesNotMatch(`${record.title} ${record.summary}`, /untouched/i);
  }
  const valeriana = RECENT_DISCOVERIES[0];
  assert.equal(valeriana.surveyOrDiscoveryDate, '2013');
  assert.equal(valeriana.publicationDate, '2024-10-29');
  assert.equal(valeriana.fieldValidated, false);
  const ocomtun = RECENT_DISCOVERIES[1];
  assert.equal(ocomtun.surveyOrDiscoveryDate, '2023');
  assert.equal(ocomtun.publicationDate, '2026-04-08');
  assert.match(ocomtun.summary, /not a new discovery year/);
  const dzibanche = RECENT_DISCOVERIES[2];
  assert.equal(dzibanche.notNewCity, true);
  assert.match(dzibanche.summary, /not a report of a city just found/);
  const maya = discoveryErrors({
    id: 'headline',
    title: 'Untouched Mayan city',
    place: 'somewhere',
    region: 'south-america',
    listing: 'field-find',
    culture: 'Maya',
    surveyOrDiscoveryDate: '2024',
    publicationDate: '2024-01-01',
    primaryUrl: 'https://www.cambridge.org/core/journals/antiquity/',
    summary: 'Untouched Mayan city',
  });
  assert.ok(maya.some((error) => /not in South America/.test(error)));
  assert.ok(maya.some((error) => /unsourced headline/.test(error)));
  const old = discoveryErrors({
    id: 'stonehenge',
    title: 'Stonehenge',
    place: 'England',
    region: 'europe',
    listing: 'field-find',
    surveyOrDiscoveryDate: '1900',
    publicationDate: '2024-01-01',
    primaryUrl: 'https://whc.unesco.org/en/list/373',
    summary: 'An old monument.',
  });
  assert.ok(old.some((error) => /not listed as a recent discovery/.test(error)));
});

test('Grand Canyon notes keep park overview, named traditions, and the newspaper story apart', () => {
  assert.deepEqual(
    GRAND_CANYON_NOTES.map((note) => note.kind),
    [
      'documented-archaeology',
      'indigenous-tradition',
      'indigenous-tradition',
      'indigenous-tradition',
      'indigenous-tradition',
      'unverified-legend',
    ],
  );
  assert.deepEqual(
    GRAND_CANYON_NOTES.filter((note) => note.kind === 'indigenous-tradition').map((note) => note.nation),
    ['Hopi', 'A:shiwi (Zuni)', 'Hualapai', 'Havasupai'],
  );
  for (const note of GRAND_CANYON_NOTES) {
    assert.deepEqual(canyonErrors(note), []);
    assert.equal(note.lat, undefined);
    for (const source of note.sources) assert.equal(safeSourceUrl(source.url), source.url);
  }
  const traditions = GRAND_CANYON_NOTES.filter((note) => note.kind === 'indigenous-tradition');
  for (const note of traditions) {
    assert.doesNotMatch(`${note.title} ${note.text}`, /\b(myth|legend|hoax)\b/i);
  }
  const legend = GRAND_CANYON_NOTES.at(-1);
  assert.match(legend.text, /5 April 1909/);
  assert.match(legend.text, /cover-up is not established/);
  assert.match(legend.text, /separate from the traditions/);
  assert.doesNotMatch(legend.text, /\b(debunk|hoax|misinformation)\b/i);
});
