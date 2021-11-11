import { TgElementExtraData } from '../type';

export function get(value?: string, data?: TgElementExtraData) {
  const items: Record<string, string> = {};

  if (typeof value === 'string' && value.trim() !== '') {
    value.split(';').forEach((pair) => {
      let arr = pair.split(':');
      if (arr.length === 2) {
        if (arr[0].indexOf(',') > -1) {
          // check whether they are number or not
          const nums = arr[0].split(',')
          if (!nums.every(item => /\d+/.test(item.trim()))) {
            throw new Error('Multiple keys of map is wrong. Please check whether they are number or not.')
          }
          // Multiple Values
          nums.forEach((key) => {
            items[key.trim()] = arr[1].trim();
          });
        } else if (arr[0].indexOf('...') > -1) {
          // Use `...` here to define a range, inspired by Swift range operator.
          // Instead of using `-`, we can handle negative numbers easily.
          if (!(/(\d+)\.\.\.(\d+)/.test(arr[0].trim()))) {
            throw new Error('The format of key range is wrong.')
          }

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
          // the number normal case
        } else if (/\d+/.test(arr[0].trim())) {
          items[arr[0].trim()] = arr[1].trim();
        } else {
          throw new Error('The map key is wrong.')
        }
      } else {
        throw new Error('Map format is wrong.')
      }
    });
  }
  return items;
}
