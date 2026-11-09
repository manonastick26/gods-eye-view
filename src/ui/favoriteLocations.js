/** Local saved places. The browser store is the only copy; nothing is uploaded. */

export const FAVORITES_STORAGE_KEY = 'gev-favorite-locations';
const MAX_FAVORITES = 20;

function finite(value, min, max) {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max
    ? number
    : null;
}

/** A place worth keeping, or null when the coordinates or name are unusable. */
export function normalizeFavorite(input) {
  const lat = finite(input?.lat, -90, 90);
  const lon = finite(input?.lon, -180, 180);
  const name = String(input?.name || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);
  if (lat === null || lon === null || !name) return null;
  const id = `${lat.toFixed(5)},${lon.toFixed(5)}`;
  return { id, name, lat, lon };
}

/** @param {{getItem?: Function}|null} storage */
export function readFavorites(storage) {
  if (!storage?.getItem) return [];
  try {
    const parsed = JSON.parse(storage.getItem(FAVORITES_STORAGE_KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    const places = [];
    const seen = new Set();
    for (const item of parsed) {
      const place = normalizeFavorite(item);
      if (!place || seen.has(place.id)) continue;
      seen.add(place.id);
      places.push(place);
      if (places.length >= MAX_FAVORITES) break;
    }
    return places;
  } catch {
    return [];
  }
}

function writeFavorites(storage, places) {
  storage?.setItem?.(FAVORITES_STORAGE_KEY, JSON.stringify(places));
  return places;
}

/**
 * Save a place at the front of the list. The same coordinates replace the
 * older name. Storage failures leave the previous list unchanged.
 * @returns {Array<{id: string, name: string, lat: number, lon: number}>}
 */
export function addFavorite(storage, input) {
  const place = normalizeFavorite(input);
  const current = readFavorites(storage);
  if (!place || !storage?.setItem) return current;
  try {
    return writeFavorites(
      storage,
      [place, ...current.filter((item) => item.id !== place.id)].slice(
        0,
        MAX_FAVORITES,
      ),
    );
  } catch {
    return current;
  }
}

/** @returns {Array<{id: string, name: string, lat: number, lon: number}>} */
export function removeFavorite(storage, id) {
  const current = readFavorites(storage);
  if (!storage?.setItem) return current;
  try {
    return writeFavorites(
      storage,
      current.filter((item) => item.id !== id),
    );
  } catch {
    return current;
  }
}
