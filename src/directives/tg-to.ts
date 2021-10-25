import { AttributeNumber } from '../type';

// Default value
const DEFAULT = 1;

export function get(value?: AttributeNumber) {
  return value ? Number(value) : DEFAULT;
}
