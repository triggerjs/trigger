// Default value
const DEFAULT = 1;

export function get(value) {
  return value === "" ? DEFAULT : Number(value);
}
