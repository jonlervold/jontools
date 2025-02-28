type FetchFilesSuccessResult = {
  success: true;
  blobData: Blob;
  failures: string[];
  failuresDescription: string | null;
  filename: string;
  errorMessage: null;
};

type FetchFilesFailResult = {
  success: false;
  blobData: null;
  failures: null;
  failuresDescription: null;
  filename: null;
  errorMessage: string;
};

// Unionize so that if success is true, other properties must match, and vice versa.
export type FetchFilesResult = FetchFilesSuccessResult | FetchFilesFailResult;

export const createFetchFilesSuccessResult = (
  blobData: Blob,
  failures: string[],
  failuresDescription: string,
  filename: string
): FetchFilesResult => {
  return {
    success: true,
    blobData,
    failures,
    failuresDescription: failuresDescription || null,
    filename,
    errorMessage: null,
  };
};

export const createFetchFilesFailResult = (
  errorMessage: string
): FetchFilesResult => {
  return {
    success: false,
    blobData: null,
    failures: null,
    failuresDescription: null,
    filename: null,
    errorMessage,
  };
};
