/**
 * Calculate the length of decimal places for a number
 * @param {number} number The number.
 * @returns {number} The caculated length.
 */
export function decimalsLength(number: number): number {
  if (Math.floor(number) === number) return 0;
  return number.toString().split('.')[1].length || 0;
}

/**
 * Get the value. If it is greater than max, get max, otherwise get min.
 * @param {number} value 
 * @param {number} min min value in the range
 * @param {number} max max value in the range
 * @returns number
 */
export function getValueInRange(value: number, min: number, max: number) {
  return Math.min(
    Math.max(value, 0),
    1
  );
}
