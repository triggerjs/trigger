import { defaultBezier } from '../ease';

export function get(value?: string) {
  if (typeof value === 'string') {
    if (value.indexOf(',') > -1) {
      const arr = value.split(',');
      if (arr.length !== 4) {
        throw new Error(
          `Bezier function expected 4 arguments, but got ${arr.length}.`
        );
      }
      return arr;
    } else if (!defaultBezier.hasOwnProperty(value)) {
      // Available named bezier values: `ease`, `easeIn`, `easeOut`, `easeInOut`
      throw new Error(
        'The default value of the bezier function does not exist！'
      );
    }
    return value;
  }
}
