// Default value
const DEFAULT = 0;

export function get(value) {
  return value ? Number(value) : DEFAULT;
}
