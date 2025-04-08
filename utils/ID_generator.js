import { v4 as uuidv4 } from 'uuid';

export const PREFIX = 'Linkify_id_';

// Generate 10-character ID based on UUID with prefix
export function generateUuidBasedId() {
  const uuid = uuidv4().replace(/-/g, ''); // Remove dashes
  const core = uuid.slice(0, 10); // Take first 10 chars
  return PREFIX + core;           // Add prefix e.g. id_a1b2c3d4e5
}

// More robust validator
export function isValidUuidBasedId(id) {
  if (!id.startsWith(PREFIX)) return false;
  const core = id.slice(PREFIX.length);
  return /^[a-f0-9]{10}$/i.test(core);
}
