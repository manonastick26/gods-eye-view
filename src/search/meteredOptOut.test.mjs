import assert from 'node:assert/strict';
import test from 'node:test';
import { createDefaultPlaceSearch } from './defaults.js';

test('paid place search is skipped when metered providers are off', async () => {
  const urls = [];
  const search = createDefaultPlaceSearch({
    allowMetered: false,
    resolveApiKey: () => 'present-but-unused',
    fetchImpl: async (url) => {
      urls.push(String(url));
      if (String(url).includes('photon')) {
        return {
          ok: true,
          json: async () => ({
            features: [
              {
                geometry: { type: 'Point', coordinates: [-97.74, 30.27] },
                properties: { name: 'Austin', country: 'United States' },
              },
            ],
          }),
        };
      }
      return { ok: false, status: 500, json: async () => ({}) };
    },
  });
  const found = await search.geocode('Austin');
  assert.equal(found.place?.name, 'Austin');
  assert.equal(
    urls.some((url) => url.includes('/api/google/')),
    false,
  );
  assert.equal(await search.reverseGeocode(30.27, -97.74), null);
  assert.deepEqual(
    await search.textSearch('cafe', { latitude: 30, longitude: -97 }),
    [],
  );
  assert.deepEqual(await search.nearby({ latitude: 30, longitude: -97 }), []);
  assert.equal(
    urls.some((url) => url.includes('/api/google/')),
    false,
  );
});
