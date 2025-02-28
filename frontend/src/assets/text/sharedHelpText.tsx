/**
 * Functions for generating help text that is shared across multiple features.
 */

export const selectFilesHelp = (
  article: "a" | "an",
  presentTenseAction: string,
  pastTenseAction: string
) => {
  return [
    `Select the files you wish to ${presentTenseAction} using the button below.`,

    `If you select one file, the server will return ${article} ${pastTenseAction} version of that single MIDI file.`,

    `If you select multiple files, the server will return a zip file containing
        inversions of all the files you selected.`,

    `Up to 50 files may be processed at a time. Files must not exceed 1 MB in size.`,
  ];
};

export const removePitchBendsHelp = (nominalizedAction: string) => {
  return [
    `Pitch bends are often used for subtle effects in MIDI files, but some MIDI compositions may use them in place of
      traditional note changes. In these instances, accurately interpreting and modifying the pitch bends to match the
      selected ${nominalizedAction} settings requires human judgment, which is beyond the scope of this tool.`,

    `If Remove Pitch Bends is checked, all pitch bends will be reset to 0, meaning any pitch variations in the original
      file will be removed, and all notes will play at their default pitch.`,
  ];
};

export const skipTrackTenHelp = (pastTenseAction: string) => {
  return [
    `MIDI track 10 is traditionally reserved for drum and percussion instruments. Unlike other tracks
      that play pitched notes, track 10 triggers specific drum sounds (e.g. kick drum, snare, hi-hat) mapped to
      different keys.`,

    `When checked, the "Skip Track Ten" option prevents track 10 from being ${pastTenseAction}, ensuring that drum
      patterns remain intact.`,

    `If you are working with non-standard MIDI files where track 10 is used for a pitched instrument, "Skip Track Ten"
      should be unchecked.`,
  ];
};

export const resetSubmitHelp = (pastTenseAction: string) => {
  return [
    "The Reset button reverts all fields on the page to their defaults.",

    `The Submit button sends your request to the server and returns ${pastTenseAction} versions of the selected files based
        on the selections made above.`,
  ];
};
