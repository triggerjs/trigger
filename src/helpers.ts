// Calculate the length of decimal places for a number
export function decimalsLength(number: number) {
  if (Math.floor(number.valueOf()) === number.valueOf()) return 0;
  return number.toString().split('.')[1].length || 0;
}
