import {
  EARTH_RADIUS_KM,
  greatCircleKm,
  isGeoPoint,
} from '../../../src/geoDistance.js';

const DEG = Math.PI / 180;

function unitVector(lat, lon) {
  const phi = lat * DEG;
  const lambda = lon * DEG;
  const cosPhi = Math.cos(phi);
  return [cosPhi * Math.cos(lambda), cosPhi * Math.sin(lambda), Math.sin(phi)];
}

function fromVector(vector) {
  const [x, y, z] = vector;
  return {
    lat: (Math.asin(Math.min(1, Math.max(-1, z))) * 180) / Math.PI,
    lon: (Math.atan2(y, x) * 180) / Math.PI,
  };
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/** Initial great-circle bearing in degrees clockwise from north, or null. */
export function initialBearingDeg(from, to) {
  if (!isGeoPoint(from) || !isGeoPoint(to)) return null;
  if (greatCircleKm(from, to) < 0.05) return null;
  const phi1 = from.lat * DEG;
  const phi2 = to.lat * DEG;
  const delta = (to.lon - from.lon) * DEG;
  const y = Math.sin(delta) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(delta);
  const degrees = (Math.atan2(y, x) * 180) / Math.PI;
  return (degrees + 360) % 360;
}

/**
 * A proposed great-circle path between two markers.
 * Antipodal pairs are refused: more than one great circle joins them, so a
 * single drawn line would pretend the path is unique.
 * Samples are the short arc, including across the antimeridian.
 */
export function proposeAlignment(from, to, sampleCount = 64) {
  if (!isGeoPoint(from) || !isGeoPoint(to))
    return { ok: false, reason: 'invalid-point', samples: [] };
  const distanceKm = greatCircleKm(from, to);
  if (!Number.isFinite(distanceKm))
    return { ok: false, reason: 'invalid-point', samples: [] };
  if (distanceKm < 0.05) {
    return {
      ok: true,
      reason: 'same-point',
      distanceKm: 0,
      bearingDeg: null,
      samples: [{ lat: from.lat, lon: from.lon }],
    };
  }
  const start = unitVector(from.lat, from.lon);
  const end = unitVector(to.lat, to.lon);
  const omega = Math.acos(Math.min(1, Math.max(-1, dot(start, end))));
  if ((omega * 180) / Math.PI > 179) {
    return {
      ok: false,
      reason: 'antipodal',
      distanceKm,
      bearingDeg: null,
      samples: [],
    };
  }
  const count = Math.max(2, Math.min(256, sampleCount | 0));
  const samples = [];
  for (let index = 0; index <= count; index += 1) {
    const t = index / count;
    const weightStart = Math.sin((1 - t) * omega) / Math.sin(omega);
    const weightEnd = Math.sin(t * omega) / Math.sin(omega);
    samples.push(
      fromVector([
        start[0] * weightStart + end[0] * weightEnd,
        start[1] * weightStart + end[1] * weightEnd,
        start[2] * weightStart + end[2] * weightEnd,
      ]),
    );
  }
  return {
    ok: true,
    reason: 'proposed',
    distanceKm,
    bearingDeg: initialBearingDeg(from, to),
    radiusKm: EARTH_RADIUS_KM,
    samples,
  };
}

export function formatAlignment(result) {
  if (!result?.ok && result?.reason === 'antipodal')
    return 'These points are nearly opposite each other. A single great circle is not unique, so no line is drawn.';
  if (!result?.ok) return 'Those points cannot be connected.';
  if (result.reason === 'same-point')
    return 'That is the same place. Distance is 0 km, and there is no bearing.';
  const km = result.distanceKm.toFixed(result.distanceKm >= 100 ? 0 : 1);
  const bearing = result.bearingDeg.toFixed(1);
  return `Proposed alignment: ${km} km, initial bearing ${bearing}°. This is the short great-circle path you chose. It is not evidence of a built line or of ancient intent.`;
}
