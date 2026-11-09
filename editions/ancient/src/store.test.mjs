import assert from 'node:assert/strict';
import test from 'node:test';
import {
  addAlignment,
  clearAlignments,
  readAlignments,
  readFavorites,
  removeAlignment,
  toggleFavorite,
} from './store.js';
import { safeSourceUrl } from './content.js';

function memory() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem(key, value) {
      data.set(key, String(value));
    },
  };
}

test('favorites and proposed alignments persist only in the supplied store', () => {
  const storage = memory();
  assert.deepEqual(toggleFavorite(storage, 'machu-picchu'), ['machu-picchu']);
  assert.deepEqual(toggleFavorite(storage, 'machu-picchu'), []);
  toggleFavorite(storage, 'tiwanaku');
  assert.deepEqual(readFavorites(storage), ['tiwanaku']);
  const lines = addAlignment(storage, 'machu-picchu', 'tiwanaku');
  assert.equal(lines.length, 1);
  assert.equal(addAlignment(storage, 'machu-picchu', 'tiwanaku').length, 1);
  assert.equal(addAlignment(storage, 'machu-picchu', 'machu-picchu').length, 1);
  assert.deepEqual(readAlignments(storage).map((item) => item.id), [
    'machu-picchu__tiwanaku',
  ]);
  assert.equal(removeAlignment(storage, lines[0].id).length, 0);
  addAlignment(storage, 'a', 'b');
  assert.deepEqual(clearAlignments(storage), []);
});

test('source links stay on https pages this edition names', () => {
  assert.equal(
    safeSourceUrl('https://whc.unesco.org/en/list/274'),
    'https://whc.unesco.org/en/list/274',
  );
  assert.equal(safeSourceUrl('http://whc.unesco.org/en/list/274'), null);
  assert.equal(safeSourceUrl('https://evil.example/unesco'), null);
  assert.equal(safeSourceUrl('javascript:alert(1)'), null);
  assert.equal(
    safeSourceUrl('https://github.com/geoinfo-smdu/M3DC'),
    'https://github.com/geoinfo-smdu/M3DC',
  );
  assert.equal(safeSourceUrl('https://github.com/someone/else'), null);
});
