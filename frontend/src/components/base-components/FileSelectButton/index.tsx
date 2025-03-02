import { FC } from "react";

const FILE_TYPE_MAPPINGS = {
  'MP3': ['audio/mpeg', 'audio/mp3'],
  'MIDI': ['audio/midi', 'audio/x-midi'],
} as const;

export type SupportedFileType = keyof typeof FILE_TYPE_MAPPINGS;

type Props = {
  // id must be unique across each file select button so selected files go to the correct handler
  id: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  allowedFileTypes: SupportedFileType[];
};

/**
 * A component that renders a file select button.
 */
const FileSelectButton: FC<Props> = ({
  id,
  disabled = false,
  onChange,
  label,
  allowedFileTypes,
}) => {
  // Transform simple file type constants to MIME types
  const mimeTypes = allowedFileTypes.flatMap(fileType => FILE_TYPE_MAPPINGS[fileType]);

  return (
    <>
      <label htmlFor={id} className="FileSelectButton">
        {label}
      </label>
      <input
        id={id}
        type="file"
        multiple
        accept={mimeTypes.join(", ")}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};

export default FileSelectButton;
