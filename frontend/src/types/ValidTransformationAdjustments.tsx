// Define valid note adjustments as readonly tuple
export const VALID_TRANSFORMATION_ADJUSTMENTS = [
  11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10,
  -11,
] as const;

// Generate a type based on the VALID_TRANSFORMATION_ADJUSTMENTS array defining valid note adjustments
export type ValidTransformationAdjustments =
  (typeof VALID_TRANSFORMATION_ADJUSTMENTS)[number];
