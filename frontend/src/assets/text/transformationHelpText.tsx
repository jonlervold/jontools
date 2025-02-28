import {
  removePitchBendsHelp,
  resetSubmitHelp,
  selectFilesHelp,
  skipTrackTenHelp,
} from "./sharedHelpText";

/**
 * The help text for the MIDI Transformer feature.
 */
const transformationHelpText = {
  selectFilesHelp: selectFilesHelp("a", "transform", "transformed"),
  automaticOrManualHelp: [
    "Automatic Note Selection will allow you to easily transform any mode in any key into any other mode of that key.",

    `Manual Note Selection will allow you to change every individual note of the chromatic scale
      into any other of your choosing. Each note may be transposed up or down by 11 semitones.`,

    `When unchecking the Use Automatic Note Selection checkbox, whatever was selected within the Automatic Note
      Selection dropdowns will apply to the Manual Note Selection dropdowns. This allows for fine tuning of an option
      provided by the Automatic Note Selection tool.`,
  ],
  snapNonModeInputNotesHelp: [
    `The Snap Non-Mode Input Notes to Output Modes setting ensures that all notes in the final MIDI file match the
      selected output mode.`,

    `When checked, any notes not in the selected input mode will be adjusted to the nearest note in the output mode.
      If unchecked, these notes will remain as they are in the original file.`,

    `The Snap Direction setting determines whether these notes are repitched upward or downward to the nearest output mode note.`,
  ],
  removePitchBendsHelp: removePitchBendsHelp("transformation"),
  skipTrackTenHelp: skipTrackTenHelp("transformed"),
  resetSubmitHelp: resetSubmitHelp("transformed"),
};

export default transformationHelpText;
