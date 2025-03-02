import enforceMinimumDuration from "../../util/enforceMinimumDuration";
import { useState } from "react";

/**
 * A hook that manages the state of the upload file list.
 */
export const useUploadFileList = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  maximumFileUploadCount: number
) => {
  // Upload file list state
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);

  // Resets upload file list state
  const clearUploadFiles = () => {
    setUploadFiles(null);
  };

  // Changes the state of the files list based on what the user selects
  const handleUploadFilesChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    setIsLoading(true);
    const startTime = new Date();

    const files =
      event.target.files && event.target.files.length > 0
        ? event.target.files
        : null;

    await enforceMinimumDuration(startTime);

    files && files.length > maximumFileUploadCount
      ? setErrorMessage(
          `You may only select up to ${maximumFileUploadCount} file${
            maximumFileUploadCount > 1 ? "s" : ""
          } at a time.`
        )
      : setUploadFiles(files);

    setIsLoading(false);
  };

  return { uploadFiles, clearUploadFiles, handleUploadFilesChange };
};
