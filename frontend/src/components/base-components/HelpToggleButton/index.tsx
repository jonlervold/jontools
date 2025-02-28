import Button from "../Button";
import { FC } from "react";

type Props = {
  showHelp: boolean;
  handleShowHelpClick: () => void;
};

/**
 * A component that renders the help toggle button that shows and hides the help messages on the feature pages.
 */
const HelpToggleButton: FC<Props> = ({ showHelp, handleShowHelpClick }) => {
  return (
    <Button
      label={showHelp ? "Hide Info/Help" : "Show Info/Help"}
      onClick={handleShowHelpClick}
      width="9rem"
      theme="red"
    />
  );
};

export default HelpToggleButton;
