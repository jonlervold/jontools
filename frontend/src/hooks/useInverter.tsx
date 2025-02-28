import { useUploadFileList } from "./base-component-hooks/useUploadFileList";
import { useErrorReadout } from "./base-component-hooks/useErrorReadout";
import { useCheckbox } from "./base-component-hooks/useCheckbox";
import fetchInversions from "../api/routes/fetchInversions";
import saveFile from "../util/saveFile";
import { useState } from "react";

/**
 * A hook that manages the state of the MIDI Inverter feature.
 */
export const useInverter = () => {
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
  // Handles the error message and failures.
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
  // Clears the state of the files list
  const handleReset = (): void => {
    clearUploadFiles();
    resetSkipTrackTen();
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
  //   the user will be prompted to download it, and a message will show indicating which files failed.
  // - If all files fail, a popup will show indicating the server's error message.
  const handleSubmit = async (): Promise<void> => {
    if (!uploadFiles) {
      setErrorMessage("No files selected.");
      return;
    }

    setIsLoading(true);
    const result = await fetchInversions(skipTrackTen, uploadFiles);

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
    ...helpToggleTemplateItems,
    ...errorMessageTemplateItems,
    ...uploadFileListTemplateItems,
    ...skipTrackTenTemplateItems,
    ...resetButtonTemplateItems,
    ...selectionSubmissionTemplateItems,
  };
};
