import HorizontalSpacer from "../../../base-components/HorizontalSpacer";
import Button from "../../../base-components/Button";
import { FC } from "react";

type Props = {
  handleSignalSelectionClick: (selector: string) => void;
  selectedSignal: string;
};

const LrmsButtons: FC<Props> = ({
  handleSignalSelectionClick,
  selectedSignal,
}) => {
  const buttonConfigs = [
    { label: "Original Stereo", signal: "original" },
    { label: "Left", signal: "left" },
    { label: "Right", signal: "right" },
    { label: "Mid", signal: "mid" },
    { label: "Side", signal: "side" },
  ];

  return (
    <HorizontalSpacer gapSize="0.5rem">
      {buttonConfigs.map(({ label, signal }) => (
        <Button
          key={signal}
          label={label}
          onClick={() => handleSignalSelectionClick(signal)}
          theme={selectedSignal === signal ? undefined : "unselected-gray"}
        />
      ))}
    </HorizontalSpacer>
  );
};

export default LrmsButtons;
