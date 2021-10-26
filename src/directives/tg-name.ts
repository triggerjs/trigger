import { getPrefix } from '../prefix';
import { CssVariable } from '../type';

export function get(value: string): CssVariable {
  if (!value) {
    console.warn(`${getPrefix()}name is not set`);
  }

  if (value.substring(0, 2) === `--`) {
    return value as CssVariable;
  }

  // Auto prepend -- for a CSS variable name
  return `--${value}`;
}
