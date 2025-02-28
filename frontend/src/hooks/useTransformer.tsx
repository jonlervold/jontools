import { ValidTransformationAdjustments } from "../types/ValidTransformationAdjustments";
import { useUploadFileList } from "./base-component-hooks/useUploadFileList";
import { AdjustDirectionOptions } from "../types/AdjustDirectionOptions";
import { useErrorReadout } from "./base-component-hooks/useErrorReadout";
import { modeNameToFormulaMap, ValidModes } from "../types/ValidModes";
import fetchTransformations from "../api/routes/fetchTransformations";
import { useCheckbox } from "./base-component-hooks/useCheckbox";
import { NOTES, ValidNotes } from "../types/ValidNotes";
import { useEffect, useState } from "react";
import saveFile from "../util/saveFile";
import {
  createTransformationMap,
  TransformationMap,
} from "../types/TransformationMap";

/**
 * A hook that manages the state of the MIDI Transformer feature.
 */
export const useTransformer = () => {
  /*********************
   * LOADING INDICATOR *
   *********************/
  // Submission loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Items from this section needed on the template
  const loadingTemplateItems = {
    isLoading,
  };

  /*****************
   * ERROR MESSAGE *
   *****************/
  const {
    failures,
    setFailures,
    errorMessage,
    setErrorMessage,
    failuresDescription,
    setFailuresDescription,
    handleCloseErrorModalClick,
  } = useErrorReadout();

  // Items from this section needed on the template
  const errorMessageTemplateItems = {
    failures,
    errorMessage,
    failuresDescription,
    handleCloseErrorModalClick,
  };

  /***************
   * HELP TOGGLE *
   ***************/
  // Toggle button functions the same as a basic checkbox
  const { isChecked: showHelp, handleToggleCheckbox: handleShowHelpClick } =
    useCheckbox(false);

  // Items from this section needed on the template
  const helpToggleTemplateItems = {
    showHelp,
    handleShowHelpClick,
  };

  /*******************************
   * UPLOAD FILE BUTTON AND LIST *
   *******************************/
  // Handles the upload file button and list.
  const { uploadFiles, clearUploadFiles, handleUploadFilesChange } =
    useUploadFileList(setIsLoading, setErrorMessage);

  // Items from this section needed on the template
  const uploadFileListTemplateItems = {
    uploadFiles,
    handleUploadFilesChange,
  };

  /******************************
   * USE AUTO SELECTOR CHECKBOX *
   ******************************/

  // Doesn't use checkbox hook due to needing custom handler.
  // Must apply auto selector transformation when switching between auto/manual selection so that the two tools remain
  //   in sync. Otherwise it gets confusing.

  // Use auto selector checkbox state
  const [useAutoSelector, setUseAutoSelector] = useState<boolean>(true);

  // Changes use auto selector checkbox to opposite state
  const handleUseAutoSelectorChange = (): void => {
    setUseAutoSelector(!useAutoSelector);

    applyAutoSelectorTransformation();
  };

  // Items from this section needed on the template
  const useAutoSelectorTemplateItems = {
    useAutoSelector,
    handleUseAutoSelectorChange,
  };

  /*****************
   * AUTO-SELECTOR *
   *****************/

  // State for the auto-selector dropdowns.
  const [inputRoot, setInputRoot] = useState<ValidNotes>("C");
  const [inputMode, setInputMode] = useState<ValidModes>("Ionian/Major");
  const [outputMode, setOutputMode] = useState<ValidModes>("Ionian/Major");

  // Represents the notes in the major scale as distances from the root
  const baseIndexes = [0, 2, 4, 5, 7, 9, 11];
  // Double up the notes for wrapping purposes
  const doubledNotes = [...NOTES, ...NOTES];
  // Find the selected root note in the list of notes
  const rootIndex = doubledNotes.indexOf(inputRoot);
  // Get the adjustments to the major scale from the selected the input mode
  const inputModeFormula = modeNameToFormulaMap[inputMode];
  // Get the adjustments to the major scale from the selected the output mode
  const outputModeFormula = modeNameToFormulaMap[outputMode];

  // For the INPUT scale:
  // Combine the root index, the base indexes of the major scale, and the transformation for the selected mode
  // to get the indexes of the notes of that mode, which are then used to get the note names
  const inputModeNoteNames = baseIndexes.map((stepsFromRoot, index) => {
    const inputNoteAdjustment = inputModeFormula[index];
    const noteNameIndex = rootIndex + stepsFromRoot + inputNoteAdjustment;

    return doubledNotes[noteNameIndex];
  });

  // For the OUTPUT scale:
  // Combine the root index, the base indexes of the major scale, and the transformation for the selected mode
  // to get the indexes of the notes of that mode, which are then used to get the note names
  const outputModeNoteNames = baseIndexes.map((stepsFromRoot, index) => {
    const outputNoteAdjustment = outputModeFormula[index];
    const noteNameIndex = rootIndex + stepsFromRoot + outputNoteAdjustment;

    return doubledNotes[noteNameIndex];
  });

  // Calculate the final adjustments to the input mode to transform it into the output mode
  const finalInputAdjustment = inputModeFormula.map(
    (inputNoteAdjustment, index) => {
      const outputNoteAdjustment = outputModeFormula[index];
      const difference = Math.abs(inputNoteAdjustment - outputNoteAdjustment);

      if (inputNoteAdjustment > outputNoteAdjustment) {
        return difference * -1; // lower the note
      }

      if (inputNoteAdjustment < outputNoteAdjustment) {
        return difference; // raise the note
      }

      return 0; // input === output, note is already correct, no adjustment needed
    }
  );

  const handleUpdateAutoSelectorDropdown = (
    dropdown: "inputRoot" | "inputMode" | "outputMode",
    selection: ValidNotes | ValidModes
  ): void => {
    if (dropdown === "inputRoot") {
      setInputRoot(selection as ValidNotes);
    }

    if (dropdown === "inputMode") {
      setInputMode(selection as ValidModes);
    }

    if (dropdown === "outputMode") {
      setOutputMode(selection as ValidModes);
    }
  };

  // Items from this section needed on the template
  const autoSelectorTemplateItems = {
    inputRoot,
    inputMode,
    outputMode,
    inputModeNoteNames,
    outputModeNoteNames,
    finalInputAdjustment,
    handleUpdateAutoSelectorDropdown,
  };

  /********************************************
   * SNAP NON-MODE INPUT NOTES TO OUTPUT MODE *
   ********************************************/

  // Determines all notes that are not in the input mode
  const nonModeNotes = [...NOTES]
    .reverse()
    .filter((note) => !inputModeNoteNames.includes(note));

  /**
   * SNAP NON-MODE INPUT NOTES TO OUTPUT MODE CHECKBOX
   */

  // State for the adjust non-mode notes checkbox
  const {
    isChecked: snapNonModeNotes,
    resetCheckbox: resetSnapNonModeNotes,
    handleToggleCheckbox: handleSnapNonModeNotesClick,
  } = useCheckbox(false);

  /**
   * ADJUSTMENT DIRECTION DROPDOWN
   */

  // State for the adjustment direction dropdown
  const [snapDirection, setSnapDirection] =
    useState<AdjustDirectionOptions>("up");

  // Resets the adjustment direction dropdown to up
  const resetSnapDirection = () => {
    setSnapDirection("up");
  };

  // Updates the adjustment direction dropdown
  const handleUpdateSnapDirection = (
    direction: AdjustDirectionOptions
  ): void => {
    setSnapDirection(direction);
  };

  /**
   * NON-MODE NOTES GRID
   */

  // Possible transformations for each non-mode note in the INPUT MODE in the non-mode notes selector.
  // Determines which note in the selected OUTPUT mode is one up from the given non-mode note
  // and which note is one down from the given non-mode note.
  const nonModeNotesPossibleTransformations: Partial<
    Record<
      ValidNotes,
      {
        nextNoteUpStepDifference: number;
        nextNoteDownStepDifference: number;
      }
    >
  > = {};
  for (const nonModeNote of nonModeNotes) {
    const nonModeNoteIndex = NOTES.indexOf(nonModeNote);

    // Helper function to get wrapped note index
    const getWrappedNoteIndex = (index: number): number => {
      // Add NOTES.length before modulo to handle negative numbers correctly
      return (index + NOTES.length) % NOTES.length;
    };

    // Get the next note up from the non-mode note
    let nextNoteUpStepDifference = 0;
    let nextNoteUpIndex = getWrappedNoteIndex(
      nonModeNoteIndex + nextNoteUpStepDifference
    );
    let nextNoteUpName: ValidNotes = NOTES[nextNoteUpIndex];
    while (!outputModeNoteNames.includes(nextNoteUpName)) {
      nextNoteUpStepDifference++;
      nextNoteUpIndex = getWrappedNoteIndex(
        nonModeNoteIndex + nextNoteUpStepDifference
      );
      nextNoteUpName = NOTES[nextNoteUpIndex];

      // This should never happen, but just in case
      if (nextNoteUpStepDifference >= 11) {
        break;
      }
    }

    // Get the next note down from the non-mode note
    let nextNoteDownStepDifference = 0;
    let nextNoteDownIndex = getWrappedNoteIndex(
      nonModeNoteIndex + nextNoteDownStepDifference
    );
    let nextNoteDownName: ValidNotes = NOTES[nextNoteDownIndex];
    while (!outputModeNoteNames.includes(nextNoteDownName)) {
      nextNoteDownStepDifference--;
      nextNoteDownIndex = getWrappedNoteIndex(
        nonModeNoteIndex + nextNoteDownStepDifference
      );
      nextNoteDownName = NOTES[nextNoteDownIndex];

      // This should never happen, but just in case
      if (nextNoteDownStepDifference <= -11) {
        break;
      }
    }

    // Final format: [steps to next note up, 0 for current note, steps to next note down]
    nonModeNotesPossibleTransformations[nonModeNote] = {
      nextNoteUpStepDifference,
      nextNoteDownStepDifference,
    };
  }

  // Items from this section needed on the template
  const adjustNonModeNotesTemplateItems = {
    snapDirection,
    snapNonModeNotes,
    handleUpdateSnapDirection,
    handleSnapNonModeNotesClick,
  };

  /*********************************************************
   * COMBINING AUTO-SELECTOR AND NON-MODE NOTES ADJUSTMENT *
   *********************************************************/

  // A map of the changes to the input mode to transform it into the output mode
  const autoSelectorModeTransformationMap = Object.fromEntries(
    inputModeNoteNames.map((noteName, index) => [
      noteName,
      finalInputAdjustment[index],
    ])
  );

  // A map of the changes to the notes not present in the input mode to snap them to the output mode.
  const nonModeNotesTransformationMap = Object.fromEntries(
    nonModeNotes.map((note) => [
      note,
      snapDirection === "up"
        ? nonModeNotesPossibleTransformations[note]?.nextNoteUpStepDifference
        : nonModeNotesPossibleTransformations[note]?.nextNoteDownStepDifference,
    ])
  );

  // When the auto selector dropdowns change, or the non-mode notes transformation map changes,
  // apply the auto selection to the final map.
  useEffect(() => {
    applyAutoSelectorTransformation();
  }, [inputRoot, inputMode, outputMode, snapNonModeNotes, snapDirection]);

  // Updates transform map with the partial map provided by the auto-selector component and, if the
  // adjust non-mode notes checkbox is checked, the non-mode notes transformation map.
  const applyAutoSelectorTransformation = (): void => {
    setTransformationMap({
      ...createTransformationMap(),
      ...autoSelectorModeTransformationMap,
      ...(snapNonModeNotes ? nonModeNotesTransformationMap : {}),
    });
  };

  // Items from this section needed on the template
  const combineAutoSelectorAndNonModeNotesTemplateItems = {
    nonModeNotesTransformationMap,
  };

  /**********************
   * TRANSFORMATION MAP *
   **********************/

  // Final transformation map state
  const [transformationMap, setTransformationMap] = useState<TransformationMap>(
    createTransformationMap()
  );

  // Updates transformation map with provided key and noteAdjustment, used by single note dropdowns
  const handleUpdateTransformationMap = (
    note: keyof TransformationMap,
    noteAdjustment: ValidTransformationAdjustments
  ): void => {
    const newMap = { ...transformationMap };
    newMap[note] = noteAdjustment;
    setTransformationMap(newMap);
  };

  // Items from this section needed on the template
  const transformationMapTemplateItems = {
    transformationMap,
    handleUpdateTransformationMap,
  };

  /*******************************
   * REMOVE PITCH BENDS CHECKBOX *
   *******************************/
  // Handles the remove pitch bends checkbox.
  const {
    isChecked: removePitchBends,
    resetCheckbox: resetRemovePitchBends,
    handleToggleCheckbox: handleRemovePitchBendsClick,
  } = useCheckbox(false);

  // Items from this section needed on the template
  const removePitchBendsTemplateItems = {
    removePitchBends,
    handleRemovePitchBendsClick,
  };

  /***************************
   * SKIP TRACK TEN CHECKBOX *
   ***************************/
  // Handles the skip track ten checkbox.
  const {
    isChecked: skipTrackTen,
    resetCheckbox: resetSkipTrackTen,
    handleToggleCheckbox: handleSkipTrackTenChange,
  } = useCheckbox(true);

  // Items from this section needed on the template
  const skipTrackTenTemplateItems = {
    skipTrackTen,
    handleSkipTrackTenChange,
  };

  /****************
   * RESET BUTTON *
   ****************/

  // Clears the state of the files list and the input element itself
  const handleReset = (): void => {
    clearUploadFiles();
    resetSkipTrackTen();
    resetSnapDirection();
    resetRemovePitchBends();
    resetSnapNonModeNotes();
    setTransformationMap(createTransformationMap());
    handleUpdateAutoSelectorDropdown("inputRoot", "C");
    handleUpdateAutoSelectorDropdown("inputMode", "Ionian/Major");
    handleUpdateAutoSelectorDropdown("outputMode", "Ionian/Major");
  };

  // Items from this section needed on the template
  const resetButtonTemplateItems = {
    handleReset,
  };

  /************************
   * SELECTION SUBMISSION *
   ************************/

  // Submits the selection to the server.
  // - If no upload files were set, shows an error.
  // - If everything succeeds, the user will be prompted to download the file.
  // - For multi-file uploads, if at least one file works, a zip will return with the successful files,
  //   the user will be prompted to download it, and an error message will show indicating which files failed.
  // - If all files fail, a popup will show indicating the server's error message.
  const handleSubmit = async (): Promise<void> => {
    if (!uploadFiles) {
      setErrorMessage("No files selected.");
      return;
    }

    setIsLoading(true);
    const result = await fetchTransformations(
      removePitchBends,
      skipTrackTen,
      transformationMap,
      uploadFiles
    );

    if (result.success) {
      if (result.failures.length > 0) {
        setFailures(result.failures);
        setFailuresDescription(result.failuresDescription);
      }

      saveFile(result.blobData, result.filename);
    } else {
      setErrorMessage(result.errorMessage);
    }

    setIsLoading(false);
  };

  // Items from this section needed on the template
  const selectionSubmissionTemplateItems = {
    handleSubmit,
  };

  return {
    ...loadingTemplateItems,
    ...errorMessageTemplateItems,
    ...helpToggleTemplateItems,
    ...uploadFileListTemplateItems,
    ...useAutoSelectorTemplateItems,
    ...autoSelectorTemplateItems,
    ...adjustNonModeNotesTemplateItems,
    ...combineAutoSelectorAndNonModeNotesTemplateItems,
    ...transformationMapTemplateItems,
    ...removePitchBendsTemplateItems,
    ...skipTrackTenTemplateItems,
    ...resetButtonTemplateItems,
    ...selectionSubmissionTemplateItems,
  };
};
