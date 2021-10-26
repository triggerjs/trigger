export type EdgeOptions = 'cover' | 'inset';
// Default Value
const DEFAULT: EdgeOptions = 'cover';

export function get(value?: EdgeOptions) {
  // only supports cover / inset for now
  if (!value || !['cover', 'inset'].includes(value)) {
    value = DEFAULT;
  }

  return value;
}
