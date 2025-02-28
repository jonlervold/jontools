import transformNoteAdjustmentToFlatsAndSharps from "./transformNoteAdjustmentToFlatsAndSharps";

/**
 * Takes in a note formula and transforms it to a musician readable format
 * Input: [0, -1, -1, 0, 0, -1, -1]
 * Output: "1 b2 b3 4 5 b6 b7"
 */
const transformFormulaToFlatsAndSharps = (modeFormula: number[]): string => {
  let outputString = "";

  let i = 1;
  for (const noteAdjustment of modeFormula) {
    outputString +=
      transformNoteAdjustmentToFlatsAndSharps(noteAdjustment) + i + " ";
    i++;
  }

  return outputString;
};

export default transformFormulaToFlatsAndSharps;
