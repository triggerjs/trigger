// Default Value
const DEFAULT = "cover";

export function get(value) {
  // only supports cover / inset for now
  if (!value || !["cover", "inset"].includes(value)) {
    value = DEFAULT;
  }

  return value;
}
