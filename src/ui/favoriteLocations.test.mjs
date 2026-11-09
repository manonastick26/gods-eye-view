import assert from 'node:assert/strict';
import test from 'node:test';
import {
  addFavorite,
  normalizeFavorite,
  readFavorites,
  removeFavorite,
} from './favoriteLocations.js';

function memory() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem(key, value) {
      data.set(key, String(value));
    },
  };
}

test('favorites keep a named coordinate and ignore junk', () => {
  assert.equal(normalizeFavorite({ name: '  ', lat: 1, lon: 2 }), null);
  assert.equal(normalizeFavorite({ name: 'Here', lat: 91, lon: 2 }), null);
  const place = normalizeFavorite({ name: '  Capitol  ', lat: 30.2672, lon: -97.7431 });
  assert.equal(place.name, 'Capitol');
  assert.equal(place.id, '30.26720,-97.74310');
});

test('favorites persist in the supplied store and survive a reload', () => {
  const storage = memory();
  assert.deepEqual(readFavorites(storage), []);
  const first = addFavorite(storage, {
    name: 'Austin',
    lat: 30.2672,
    lon: -97.7431,
  });
  assert.equal(first.length, 1);
  const again = addFavorite(storage, {
    name: 'Austin capitol',
    lat: 30.2672,
    lon: -97.7431,
  });
  assert.equal(again.length, 1);
  assert.equal(again[0].name, 'Austin capitol');
  addFavorite(storage, { name: 'Denver', lat: 39.7392, lon: -104.9903 });
  const reloaded = readFavorites(storage);
  assert.deepEqual(
    reloaded.map((place) => place.name),
    ['Denver', 'Austin capitol'],
  );
  assert.deepEqual(
    removeFavorite(storage, reloaded[0].id).map((place) => place.name),
    ['Austin capitol'],
  );
  assert.equal(readFavorites(storage).length, 1);
});

test('a locked store does not throw and does not pretend the place was saved', () => {
  const storage = {
    getItem: () => '{',
    setItem() {
      throw new Error('denied');
    },
  };
  assert.deepEqual(readFavorites(storage), []);
  assert.deepEqual(
    addFavorite(storage, { name: 'Austin', lat: 30, lon: -97 }),
    [],
  );
});
