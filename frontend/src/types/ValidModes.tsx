// All ancohemitonic modes and their formulas (sharp or flat from Ionian/Major)
const ancohemitonicModes = [
  {
    parentScaleName: "Diatonic",
    modes: [
      {
        modeName: "Ionian/Major",
        formula: [0, 0, 0, 0, 0, 0, 0],
      },
      {
        modeName: "Dorian",
        formula: [0, 0, -1, 0, 0, 0, -1],
      },
      {
        modeName: "Phrygian",
        formula: [0, -1, -1, 0, 0, -1, -1],
      },
      {
        modeName: "Lydian",
        formula: [0, 0, 0, 1, 0, 0, 0],
      },
      {
        modeName: "Mixolydian",
        formula: [0, 0, 0, 0, 0, 0, -1],
      },
      {
        modeName: "Aeolian/Minor",
        formula: [0, 0, -1, 0, 0, -1, -1],
      },
      {
        modeName: "Locrian",
        formula: [0, -1, -1, 0, -1, -1, -1],
      },
    ],
  },
  {
    parentScaleName: "Melodic Minor",
    modes: [
      {
        modeName: "Melodic Minor",
        formula: [0, 0, -1, 0, 0, 0, 0],
      },
      {
        modeName: "Dorian Flat 2",
        formula: [0, -1, -1, 0, 0, 0, -1],
      },
      {
        modeName: "Lydian Augmented",
        formula: [0, 0, 0, 1, 1, 0, 0],
      },
      {
        modeName: "Lydian Dominant",
        formula: [0, 0, 0, 1, 0, 0, -1],
      },
      {
        modeName: "Mixolydian Flat 6",
        formula: [0, 0, 0, 0, 0, -1, -1],
      },
      {
        modeName: "Locrian Natural 2",
        formula: [0, 0, 0, 0, -1, -1, -1],
      },
      {
        modeName: "Altered Dominant",
        formula: [0, -1, -1, -1, -1, -1, -1],
      },
    ],
  },
  {
    parentScaleName: "Harmonic Minor",
    modes: [
      {
        modeName: "Harmonic Minor",
        formula: [0, 0, -1, 0, 0, -1, 0],
      },
      {
        modeName: "Locrian Natural 6",
        formula: [0, -1, -1, 0, -1, 0, -1],
      },
      {
        modeName: "Ionian Augmented",
        formula: [0, 0, 0, 0, 1, 0, 0],
      },
      {
        modeName: "Dorian Sharp 4",
        formula: [0, 0, -1, 1, 0, 0, -1],
      },
      {
        modeName: "Phrygian Dominant",
        formula: [0, -1, 0, 0, 0, -1, -1],
      },
      {
        modeName: "Lydian Sharp 2",
        formula: [0, 1, 0, 1, 0, 0, 0],
      },
      {
        modeName: "Ultralocrian",
        formula: [0, -1, -1, -1, -1, -1, -2],
      },
    ],
  },
  {
    parentScaleName: "Harmonic Major",
    modes: [
      {
        modeName: "Harmonic Major",
        formula: [0, 0, 0, 0, 0, -1, 0],
      },
      {
        modeName: "Locrian Natural 2, Natural 6",
        formula: [0, 0, -1, 0, -1, 0, -1],
      },
      {
        modeName: "Phrygian Flat 4",
        formula: [0, -1, -1, -1, 0, -1, -1],
      },
      {
        modeName: "Melodic Minor Sharp 4",
        formula: [0, 0, -1, 1, 0, 0, 0],
      },
      {
        modeName: "Mixolydian Flat 2",
        formula: [0, -1, 0, 0, 0, 0, -1],
      },
      {
        modeName: "Lydian Augmented Sharp 2",
        formula: [0, 1, 0, 1, 1, 0, 0],
      },
      {
        modeName: "Locrian Double-Flat 7",
        formula: [0, -1, -1, 0, -1, -1, -2],
      },
    ],
  },
  {
    parentScaleName: "Hungarian Major",
    modes: [
      {
        modeName: "Hungarian Major",
        formula: [0, 1, 0, 1, 0, 0, -1],
      },
      {
        modeName: "Ultralocrian Double-Flat 6",
        formula: [0, -1, -1, -1, -1, -2, -2],
      },
      {
        modeName: "Harmonic Minor Flat 5",
        formula: [0, 0, -1, 0, -1, -1, 0],
      },
      {
        modeName: "Altered Dominant Natural 6",
        formula: [0, -1, -1, -1, -1, 0, -1],
      },
      {
        modeName: "Melodic Minor Augmented",
        formula: [0, 0, -1, 0, 1, 0, 0],
      },
      {
        modeName: "Dorian Flat 2, Sharp 4",
        formula: [0, -1, -1, 1, 0, 0, -1],
      },
      {
        modeName: "Lydian Augmented Sharp 3",
        formula: [0, 0, 1, 1, 1, 0, 0],
      },
    ],
  },
  {
    parentScaleName: "Involution of Hungarian Major",
    modes: [
      {
        modeName: "Involution of Hungarian Major",
        formula: [0, -1, 0, 1, 0, 0, -1],
      },
      {
        modeName: "Lydian Augmented Sharp 2, Sharp 3",
        formula: [0, 1, 1, 1, 1, 0, 0],
      },
      {
        modeName: "Locrian Natural 2, Double-Flat 7",
        formula: [0, 0, -1, 0, -1, -1, -2],
      },
      {
        modeName: "Altered Double-Flat 6",
        formula: [0, -1, -1, -1, -1, -2, -1],
      },
      {
        modeName: "Melodic Minor Flat 5",
        formula: [0, 0, -1, 0, -1, 0, 0],
      },
      {
        modeName: "Phrygian Flat 4, Natural 6",
        formula: [0, -1, -1, -1, 0, 0, -1],
      },
      {
        modeName: "Melodic Minor Augmented Sharp 4",
        formula: [0, 0, -1, 1, 1, 0, 0],
      },
    ],
  },
];

// An array of objects where each object represents one mode
// Used to populate the dropdowns
export const flattenedModes = ancohemitonicModes.flatMap((scale) =>
  scale.modes.map((mode) => ({
    modeName: mode.modeName,
    modeFormula: mode.formula,
    parentScaleName: scale.parentScaleName,
  }))
);

// An object where the keys are the mode name and the values are the formula
// Used to generate the auto-selector transformation that gets applied to the main transformation selectors
export const modeNameToFormulaMap = Object.fromEntries(
  flattenedModes.map((mode) => [mode.modeName, mode.modeFormula])
);

// An array containing all of the mode names, used to generate the ValidModes type
export const validModes = flattenedModes.map((mode) => mode.modeName);

// All valid modes as a type
export type ValidModes = (typeof validModes)[number];
