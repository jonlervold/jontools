import {
  resetSubmitHelp,
  selectFilesHelp,
  skipTrackTenHelp,
} from "./sharedHelpText";

/**
 * The help text for the MIDI Inverter feature.
 */
const inversionHelpText = {
  selectFilesHelp: selectFilesHelp("an", "invert", "inverted"),
  skipTrackTenHelp: skipTrackTenHelp("inverted"),
  resetSubmitHelp: resetSubmitHelp("inverted"),
};

export default inversionHelpText;
