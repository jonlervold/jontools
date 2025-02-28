// The note names in ascending order as readonly tuple
// Ascending order ensures that positive adjustments causes the value to rise and negative adjustments
//   cause the values to lower
export const NOTES = [
  "C",
  "C#/Db",
  "D",
  "D#/Eb",
  "E",
  "F",
  "F#/Gb",
  "G",
  "G#/Ab",
  "A",
  "A#/Bb",
  "B",
] as const;

// Generate a type based on NOTES array defining valid notes
export type ValidNotes = (typeof NOTES)[number];
