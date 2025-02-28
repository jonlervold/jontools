import { ValidTransformationAdjustments } from "./ValidTransformationAdjustments";
import { NOTES, ValidNotes } from "./ValidNotes";

// Generate a type based on the ValidNotes type where values must be ValidTransformationAdjustments
export type TransformationMap = Record<
  ValidNotes,
  ValidTransformationAdjustments
>;

// Initial state created dynamically, every key set to 0
export const createTransformationMap = (): TransformationMap => {
  return Object.fromEntries(
    NOTES.map((note) => [note, 0])
  ) as TransformationMap;
};
