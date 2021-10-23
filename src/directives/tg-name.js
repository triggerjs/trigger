import { getPrefix } from "../prefix";

export function get(value) {
  if (!value) {
    console.warn(`${getPrefix()}name is not set`);
  }

  if (value.substring(0, 2) === `--`) {
    return value;
  }

  // Auto prepend -- for a CSS variable name
  return `--${value}`;
}
