import { AttributeNumber } from '../type';

// Default value
const DEFAULT = 0;

export function get(value?: AttributeNumber) {
  return value ? Number(value) : DEFAULT;
}
