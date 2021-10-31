import { TgElementExtraData } from '../type';

export function get(value?: string, data?: TgElementExtraData) {
  const items: Record<string, string> = {};

  if (typeof value === 'string' && value.trim() !== '') {
    value.split(';').forEach((pair) => {
      let arr = pair.split(':');

      if (arr.length === 2) {
        if (arr[0].indexOf(',') > -1) {
          // Multiple Values
          arr[0].split(',').forEach((key) => {
            items[key.trim()] = arr[1].trim();
          });
        } else if (arr[0].indexOf('...') > -1) {
          // Use `...` here to define a range, inspired by Swift range operator.
          // Instead of using `-`, we can handle negative numbers easily.
          let [from, to] = arr[0]
            .split('...')
            .map((val) => {
              return +val;
            })
            .sort((a, b) => a - b);

          let i = from;
          while (i <= to) {
            i = Number(i.toFixed(data?.decimals || 2));
            items[i] = arr[1].trim();

            i += data?.increment || 0.01;
          }
        } else {
          items[arr[0].trim()] = arr[1].trim();
        }
      }
    });
  }
  return items;
}
