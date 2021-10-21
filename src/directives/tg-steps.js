// Default value
const DEFAULT = 100;

export function get(value) {
  let result = value ? Number(value) : DEFAULT;

  // Should never be 0
  if (result === 0) {
    result = DEFAULT;
  }

  return result;
}
