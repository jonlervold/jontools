import { FetchFilesResult } from "../../types/FetchFilesResult";
import ApiSvc from "../svc/ApiSvc";

/**
 * Makes the API call to invert the selected MIDI files.
 */
const fetchInversions = async (
  skipTrackTen: boolean,
  uploadFiles: FileList
): Promise<FetchFilesResult> => {
  const formData = new FormData();

  formData.append("skip_track_ten", skipTrackTen ? "1" : "0");

  Array.from(uploadFiles).forEach((file) => {
    formData.append("midi_file", file);
  });

  return ApiSvc.callApiWithFormDataReturnBlob("invert", formData);
};

export default fetchInversions;
