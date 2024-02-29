import { direction } from '../type';

// Default value
const DEFAULT: direction = 'vertical';

export function get(value?: direction) {
  return value ? value : DEFAULT;
}
