import { defaultBezier } from '../ease';

export function get(value?: String) {
  if (typeof value === 'string') {
    if (value.indexOf(',') > -1) {
      let arr = value.split(',');
      if (arr.length !== 4) {
        throw new Error(
          `Bezier function expected 4 arguments, but got ${arr.length}.`
        );
      }
      return arr;
    } else if (!defaultBezier.hasOwnProperty(value as string)) {
      throw new Error(
        'The default value of the bazier function does not exist！'
      );
    }
    return value;
  }
}
