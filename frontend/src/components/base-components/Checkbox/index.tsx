import { FC } from "react";
import "./Checkbox.css";

type Props = {
  label?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
};

/**
 * A component that renders a checkbox.
 */
const Checkbox: FC<Props> = ({
  label = null,
  checked,
  disabled = false,
  onChange,
}) => {
  return (
    <label className="checkbox__container">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className="checkbox__custom-checkbox"></span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
};

export default Checkbox;
