import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ANCIENT_SITES,
  catalogErrors,
  filterSites,
  siteById,
} from './sites.js';
import { safeSourceUrl } from './content.js';

test('the bundled catalog is a modest set of real places with no invented scans', () => {
  assert.equal(catalogErrors().length, 0, catalogErrors().join('; '));
  assert.ok(ANCIENT_SITES.length >= 10 && ANCIENT_SITES.length <= 15);
  assert.equal(
    ANCIENT_SITES.filter((site) => site.region === 'south-america').length,
    3,
  );
  for (const site of ANCIENT_SITES) {
    assert.equal(safeSourceUrl(site.sourceUrl), site.sourceUrl);
    assert.equal(site.model.status, 'unavailable');
    assert.equal(site.lidar.status, 'unavailable');
    assert.match(site.coordinateNote, /Approximate/);
  }
});

test('search and region filters do not invent extra sites', () => {
  assert.deepEqual(
    filterSites(ANCIENT_SITES, { query: 'inca', region: 'south-america' }).map(
      (site) => site.id,
    ),
    ['machu-picchu', 'sacsayhuaman'],
  );
  assert.equal(filterSites(ANCIENT_SITES, { query: 'atlantis' }).length, 0);
  assert.equal(siteById('tiwanaku')?.country, 'Bolivia');
  assert.equal(siteById('missing'), null);
});
