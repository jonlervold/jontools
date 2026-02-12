/**
 * The help text for the LR/MS Player feature.
 */
const lrmsPlayerHelpText = {
  selectFilesHelp: [
    "Select the MP3 audio file you wish to play using the button below.",
  ],
  lrmsButtonsHelp: [
    `The signal selection buttons allow you to isolate and play different components of the stereo audio signal:`,

    `- Original Stereo plays the unmodified stereo signal as it appears in the source file.`,

    `- Left and Right buttons isolate the respective stereo channels.`,

    `- Mid extracts the center information that is shared between both left and right channels.`,

    `- Side extracts the stereo width information, containing the differences between left and right channels.`,
  ],
  playbackSpeedHelp: [
    `The Set Playback Speed option allows you to adjust the playback speed of the audio without changing its pitch.`,

    `When enabled, you can select speeds ranging from 10% (very slow) to 200% (double speed) of the original tempo.`,
  ],
  startTimeControlsHelp: [
    `The Use Start Time Controls option provides precise control over where playback begins in the audio file.`,

    `When enabled, you can select a specific timestamp using the dropdown menus to set your desired start position.`,

    `The "Play from [time]" button will start playback from your selected timestamp, while "Play from Current Time" 
      resumes from wherever the audio was last paused.`,

    `The Pause button stops playback at the current position, allowing you to resume from that exact point later.`,
  ],
  resetHelp: [
    "The Reset button clears all settings and returns the LR/MS Player to its default state.",

    `This includes clearing the selected audio file, resetting signal selection to Original Stereo, 
      disabling playback speed controls, disabling start time controls, and stopping any active playback.`,
  ],
};

export default lrmsPlayerHelpText;
