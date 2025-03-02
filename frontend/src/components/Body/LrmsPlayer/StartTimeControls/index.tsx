import generateArrayOfLength from "../../../../util/generateArrayOfLength";
import HorizontalSpacer from "../../../base-components/HorizontalSpacer";
import VerticalSpacer from "../../../base-components/VerticalSpacer";
import Dropdown from "../../../base-components/Dropdown";
import Button from "../../../base-components/Button";
import { ChangeEvent, FC } from "react";

type Props = {
  isPlaying: boolean;
  lengthMinutes: number;
  startTimeMinutes: number;
  startTimeSeconds: number;
  selectableSeconds: number;
  uploadFiles: FileList | null;
  handleStartTimeMinutesChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleStartTimeSecondsChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  playFromSelectedTime: () => void;
  handlePause: () => void;
  handlePlay: () => void;
};

/**
 * A component that allows the user to select a start time,
 * to start/restart playback from that time,
 * and to pause/resume playback at the current playback position.
 */
const StartTimeControls: FC<Props> = ({
  isPlaying,
  lengthMinutes,
  startTimeMinutes,
  startTimeSeconds,
  selectableSeconds,
  uploadFiles,
  handleStartTimeMinutesChange,
  handleStartTimeSecondsChange,
  playFromSelectedTime,
  handlePause,
  handlePlay,
}) => {
  // Width of the "Play from Current Time" button so it stays consistent when it changes to "Pause"
  const playFromCurrentTimeButtonWidth = "12.2rem";

  // Modifies seconds 0-9 to display as 00, 01, etc.
  const modifySecondsForDisplay = (seconds: number) => {
    return seconds < 10 ? `0${seconds}` : seconds;
  };

  // Makes button say "Play from xx:xx"
  const playFromSelectedTimeButtonLabel = `Play from ${startTimeMinutes}:${modifySecondsForDisplay(
    startTimeSeconds
  )}`;

  return (
    <VerticalSpacer>
      <Dropdown
        label="Minutes"
        onChange={handleStartTimeMinutesChange}
        value={startTimeMinutes}
        disabled={!uploadFiles}
      >
        {generateArrayOfLength(lengthMinutes + 1).map((index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </Dropdown>

      <Dropdown
        label="Seconds"
        onChange={handleStartTimeSecondsChange}
        value={startTimeSeconds}
        disabled={!uploadFiles}
      >
        {generateArrayOfLength(selectableSeconds + 1).map((index) => (
          <option key={index} value={index}>
            {modifySecondsForDisplay(index)}
          </option>
        ))}
      </Dropdown>

      <HorizontalSpacer>
        <Button
          label={playFromSelectedTimeButtonLabel}
          onClick={playFromSelectedTime}
          disabled={!uploadFiles}
        />

        {isPlaying && (
          <Button
            label="Pause"
            onClick={handlePause}
            width={playFromCurrentTimeButtonWidth}
          />
        )}

        {!isPlaying && (
          <Button
            label="Play from Current Time"
            onClick={handlePlay}
            disabled={!uploadFiles}
            width={playFromCurrentTimeButtonWidth}
          />
        )}
      </HorizontalSpacer>
    </VerticalSpacer>
  );
};

export default StartTimeControls;
