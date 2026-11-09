import assert from 'node:assert/strict';
import test from 'node:test';
import { formatAlignment, proposeAlignment } from './alignment.js';

test('a short great circle crosses the antimeridian the short way', () => {
  const result = proposeAlignment(
    { lat: 0, lon: 179.5 },
    { lat: 0, lon: -179.5 },
  );
  assert.equal(result.ok, true);
  assert.ok(result.distanceKm > 90 && result.distanceKm < 140, result.distanceKm);
  const mid = result.samples[Math.floor(result.samples.length / 2)];
  assert.ok(Math.abs(Math.abs(mid.lon) - 180) < 1, mid.lon);
  assert.match(formatAlignment(result), /not evidence/);
});

test('the same point and an antipodal pair do not invent a unique line', () => {
  const same = proposeAlignment({ lat: 10, lon: 10 }, { lat: 10, lon: 10 });
  assert.equal(same.reason, 'same-point');
  assert.equal(same.bearingDeg, null);
  const opposite = proposeAlignment(
    { lat: 0, lon: 0 },
    { lat: 0, lon: 180 },
  );
  assert.equal(opposite.ok, false);
  assert.equal(opposite.reason, 'antipodal');
  assert.equal(opposite.samples.length, 0);
  assert.match(formatAlignment(opposite), /not unique/);
});

test('broken coordinates are refused', () => {
  assert.equal(
    proposeAlignment({ lat: 91, lon: 0 }, { lat: 0, lon: 0 }).reason,
    'invalid-point',
  );
});
