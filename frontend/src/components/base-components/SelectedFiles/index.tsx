import "./SelectedFiles.css";
import { FC } from "react";

type Props = {
  uploadFiles: FileList | null;
  singular?: boolean;
};

/**
 * A component that renders a list of selected files.
 */
const SelectedFiles: FC<Props> = ({ uploadFiles, singular = false }) => {
  const nothingSelectedText = singular
    ? "No File Selected"
    : "No Files Selected";

  return (
    <div>
      {uploadFiles && (
        <div>
          <div className="selected-files__title">
            Selected File{uploadFiles.length > 1 && "s"}
          </div>
          <ul>
            {Array.from(uploadFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {!uploadFiles && (
        <div className="selected-files__title">{nothingSelectedText}</div>
      )}
    </div>
  );
};

export default SelectedFiles;
