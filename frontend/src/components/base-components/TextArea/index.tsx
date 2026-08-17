import { FC } from "react";
import "./TextArea.css";

type Props = {
  id: string;
  label?: string;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

/**
 * A component that renders a labeled textarea.
 */
const TextArea: FC<Props> = ({
  id,
  label = null,
  value,
  disabled = false,
  placeholder = "",
  rows = 4,
  onChange,
}) => {
  return (
    <label className="textarea__container" htmlFor={id}>
      {label && <span className="textarea__label">{label}</span>}
      <textarea
        id={id}
        className="textarea__field"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
      />
    </label>
  );
};

export default TextArea;
