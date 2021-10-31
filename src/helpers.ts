/**
 * Calculate the length of decimal places for a number
 * @param {number} number The number.
 * @returns {number} The caculated length.
 */
export function decimalsLength(number: number): number {
  if (Math.floor(number) === number) return 0;
  return number.toString().split('.')[1].length || 0;
}
