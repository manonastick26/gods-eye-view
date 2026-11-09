export const FAVORITES_KEY = 'ancient-edition-favorites';
export const ALIGNMENTS_KEY = 'ancient-edition-alignments';

function readList(storage, key) {
  if (!storage?.getItem) return [];
  try {
    const parsed = JSON.parse(storage.getItem(key) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
  return value;
}

export function readFavorites(storage) {
  return readList(storage, FAVORITES_KEY).filter((id) => typeof id === 'string');
}

export function toggleFavorite(storage, id) {
  const current = readFavorites(storage);
  const next = current.includes(id)
    ? current.filter((item) => item !== id)
    : [...current, id];
  try {
    return writeList(storage, FAVORITES_KEY, next);
  } catch {
    return current;
  }
}

export function readAlignments(storage) {
  return readList(storage, ALIGNMENTS_KEY).filter(
    (item) => item && typeof item.fromId === 'string' && typeof item.toId === 'string',
  );
}

export function addAlignment(storage, fromId, toId) {
  const current = readAlignments(storage);
  if (!fromId || !toId || fromId === toId) return current;
  if (current.some((item) => item.fromId === fromId && item.toId === toId))
    return current;
  const next = [...current, { id: `${fromId}__${toId}`, fromId, toId }];
  try {
    return writeList(storage, ALIGNMENTS_KEY, next);
  } catch {
    return current;
  }
}

export function removeAlignment(storage, id) {
  const next = readAlignments(storage).filter((item) => item.id !== id);
  try {
    return writeList(storage, ALIGNMENTS_KEY, next);
  } catch {
    return readAlignments(storage);
  }
}

export function clearAlignments(storage) {
  try {
    return writeList(storage, ALIGNMENTS_KEY, []);
  } catch {
    return readAlignments(storage);
  }
}
