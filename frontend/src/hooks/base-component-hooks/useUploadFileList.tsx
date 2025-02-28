import enforceMinimumDuration from "../../util/enforceMinimumDuration";
import { useState } from "react";

/**
 * A hook that manages the state of the upload file list.
 */
export const useUploadFileList = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>
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

    files && files.length > 50
      ? setErrorMessage("You may only upload up to 50 files at a time.")
      : setUploadFiles(files);

    setIsLoading(false);
  };

  return { uploadFiles, clearUploadFiles, handleUploadFilesChange };
};
