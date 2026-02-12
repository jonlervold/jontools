/**
 * Generates an array of a given length. Values will be a number.
 *
 * If zeroIndexed is true, values will start at 0 and increment by 1.
 * If zeroIndexed is false, values will start at 1 and increment by 1.
 */
const generateArrayOfLength = (
  length: number,
  zeroIndexed: boolean = true
): number[] => {
  return Array.from({ length }, (_, index) => index + (zeroIndexed ? 0 : 1));
};

export default generateArrayOfLength;
