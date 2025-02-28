import enforceMinimumDuration from "../../util/enforceMinimumDuration";
import axios, { AxiosError } from "axios";
import {
  createFetchFilesFailResult,
  createFetchFilesSuccessResult,
  FetchFilesResult,
} from "../../types/FetchFilesResult";

/**
 * Responsible for executing API calls to the backend. Wraps Axios dependency.
 */
class ApiSvc {
  /**
   * Uses Axios to call an API route with form data expecting blob data to return.
   * Parses the result into a FetchFilesResult whether successful or not.
   */
  static callApiWithFormDataReturnBlob = async (
    route: string,
    formData: FormData
  ): Promise<FetchFilesResult> => {
    const startTime = new Date();

    let result: FetchFilesResult;
    try {
      const response = await axios.post<Blob>("python-api/" + route, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });

      result = createFetchFilesSuccessResult(
        response.data,
        JSON.parse(response.headers["x-failures"] || []),
        response.headers["x-failures-description"] || "",
        response.headers["x-filename"] || ""
      );
    } catch (error) {
      result = await parseBlobApiCallError(error);
    }

    await enforceMinimumDuration(startTime);

    return result;
  };
}

/**
 * If possible, gets the server's error message if an error occurs while calling an API route.
 * This is to be used with API calls that return as a blob.
 */
const parseBlobApiCallError = async (
  error: AxiosError | unknown
): Promise<FetchFilesResult> => {
  // Properly caught server errors meet these qualifications, but so do Axios errors.
  // Axios errors won't be blobs, so this will fail and move to default error handling below.
  if (error instanceof AxiosError && error.response && error.response.data) {
    try {
      const errorText = await error.response.data.text();
      const errorJson = JSON.parse(errorText);

      return createFetchFilesFailResult(errorJson.error);
    } catch (parsingError) {
      // Fall through to default error handling below.
    }
  }

  // Anything else...
  console.error(error);

  return createFetchFilesFailResult("An unknown error occurred.");
};

export default ApiSvc;
