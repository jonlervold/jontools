/**
 * Takes an integer and transforms it into repeated # or b characters.
 * Input: -2
 * Output: bb
 */
const transformNoteAdjustmentToFlatsAndSharps = (
  noteAdjustment: number
): string => {
  if (noteAdjustment < 0) {
    return "b".repeat(noteAdjustment * -1);
  }

  if (noteAdjustment > 0) {
    return "#".repeat(noteAdjustment);
  }

  return ""; // no adjustment, no symbol needed
};

export default transformNoteAdjustmentToFlatsAndSharps;
