import { FC } from "react";

type Props = {
  // id must be unique across each file select button so selected files go to the correct handler
  id: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * A component that renders a file select button.
 */
const FileSelectButton: FC<Props> = ({ id, disabled, onChange }) => {
  return (
    <>
      <label htmlFor={id} className="FileSelectButton">
        Select MIDI Files
      </label>
      <input
        id={id}
        type="file"
        multiple
        accept={".mid, .midi, audio/midi, audio/x-midi"}
        disabled={disabled}
        onChange={onChange}
      />
    </>
  );
};

export default FileSelectButton;
