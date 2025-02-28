import { TransformationMap } from "../../types/TransformationMap";
import { FetchFilesResult } from "../../types/FetchFilesResult";
import ApiSvc from "../svc/ApiSvc";

/**
 * Makes the API call to transform the selected MIDI files.
 */
const fetchTransformations = async (
  removePitchBends: boolean,
  skipTrackTen: boolean,
  transformationMap: TransformationMap,
  uploadFiles: FileList
): Promise<FetchFilesResult> => {
  const formData = new FormData();

  formData.append("remove_pitch_bends", removePitchBends ? "1" : "0");

  formData.append("skip_track_ten", skipTrackTen ? "1" : "0");

  formData.append("transformation_map", JSON.stringify(transformationMap));

  Array.from(uploadFiles).forEach((file) => {
    formData.append("midi_file", file);
  });

  return ApiSvc.callApiWithFormDataReturnBlob("transform", formData);
};

export default fetchTransformations;
