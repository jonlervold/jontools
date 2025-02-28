import { FC } from "react";
import "./Dropdown.css";

type Props = {
  label?: string;
  labelPosition?: "top" | "left";
  disabled?: boolean;
  width?: string | null;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
};

/**
 * A component that renders a dropdown.
 */
const Dropdown: FC<Props> = ({
  label = null,
  width = "100%",
  disabled = false,
  value,
  onChange,
  children,
}) => {
  const widthStyle = width ? { width } : {};
  return (
    <span className="dropdown__wrapper" style={widthStyle}>
      {label && <div>{label}</div>}
      <div className="dropdown__dropdown" style={widthStyle}>
        <select
          style={widthStyle}
          value={value}
          onChange={(e) => onChange(e)}
          disabled={disabled}
        >
          {children}
        </select>
      </div>
    </span>
  );
};

export default Dropdown;
