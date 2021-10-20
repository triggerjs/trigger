// Default value
const DEFAULT = 100;

export function get(value) {
  return value === "" ? DEFAULT : Number(value);
}
