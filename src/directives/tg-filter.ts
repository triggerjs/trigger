export interface FilterValue {
  mode: 'retain' | 'exact';
  values: number[];
}

export function get(value?: string) {
  const filter: FilterValue = {
    mode: 'retain', // mode = retain / exact
    values: [],
  };

  if (typeof value === 'string' && value.trim() !== '') {
    // switch mode to 'exact', means that if the value is other
    // than this, should remove the css attribute (in order to keep the
    // default value of the css variable)
    if (value.substring(value.length - 1) === '!') {
      filter.mode = 'exact';
      value = value.substring(0, value.length - 1);
    }

    // Clean up all exclamation marks if added accidentally
    value = value.replace(/!/g, '');

    filter.values = value.split(',').map((item) => Number(item.trim()));
  }

  return filter;
}
