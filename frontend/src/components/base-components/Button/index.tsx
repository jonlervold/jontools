import { FC } from "react";
import "./Button.css";

type Props = {
  label?: string;
  disabled?: boolean;
  width?: string;
  theme?: "red" | "unselected-gray";
  onClick: () => void;
  children?: React.ReactNode;
};

/**
 * A component that renders a button.
 */
const Button: FC<Props> = ({
  label = null,
  disabled = false,
  width = null,
  theme = null,
  onClick,
  children = null,
}) => {
  const buttonStyling: React.CSSProperties = {};
  if (width) buttonStyling.width = width;

  let buttonThemeClass = "";
  if (theme === "red") buttonThemeClass = "button__red-theme";
  if (theme === "unselected-gray")
    buttonThemeClass = "button__unselected-gray-theme";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonThemeClass}
      style={buttonStyling}
    >
      {label && <div>{label}</div>}
      {children && <div>{children}</div>}
    </button>
  );
};

export default Button;
