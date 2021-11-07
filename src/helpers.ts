import rgbcolor from 'rgb-color';

/**
 * Calculate the length of decimal places for a number
 * @param {number} number The number.
 * @returns {number} The caculated length.
 */
export function decimalsLength(number: number): number {
  if (Math.floor(number) === number) return 0;
  return number.toString().split('.')[1].length || 0;
}

// Judge the MapValue type
/***
 * params: val
 * return: {
 *  type: MapValue Type,
 *  val: Format Value
 * }
 */
export function getMapTypeAndValue(val: string) {
  // number
  if (!isNaN(Number(val))) {
    return {
      type: 'number',
      val: +val,
    };
  } else {
    const color = rgbcolor(val);
    // 'isValid()' is true when the parsing was a success
    if (color.isValid()) {
      return {
        type: 'color',
        val: color.hex(),
      };
    }
  }
  // unknown
  return {
    type: 'unknown',
    val,
  };
}
