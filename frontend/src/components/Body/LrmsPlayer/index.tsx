import FadeContainerStatic from "../../base-components/FadeContainerStatic";
import lrmsPlayerHelpText from "../../../assets/text/lrmsPlayerHelpText";
import FileSelectButton from "../../base-components/FileSelectButton";
import HelpToggleButton from "../../base-components/HelpToggleButton";
import LoadingIndicator from "../../base-components/LoadingIndicator";
import VerticalSpacer from "../../base-components/VerticalSpacer";
import SelectedFiles from "../../base-components/SelectedFiles";
import ErrorReadout from "../../base-components/ErrorReadout";
import AudioPlayer from "../../base-components/AudioPlayer";
import HelpMessage from "../../base-components/HelpMessage";
import PlaybackSpeedOptions from "./PlaybackSpeedOptions";
import useLrmsPlayer from "../../../hooks/useLrmsPlayer";
import Checkbox from "../../base-components/Checkbox";
import Dropdown from "../../base-components/Dropdown";
import Heading from "../../base-components/Heading";
import StartTimeControls from "./StartTimeControls";
import Button from "../../base-components/Button";
import LrmsButtons from "./LrmsButtons";
import LrmsAbout from "./LrmsAbout";
import { FC } from "react";

const LrmsPlayer: FC = () => {
  const state = useLrmsPlayer();

  return (
    <>
      <LoadingIndicator isLoading={state.isLoading} />

      <ErrorReadout
        failures={state.failures}
        failuresDescription={state.failuresDescription}
        errorMessage={state.errorMessage}
        onClose={state.handleCloseErrorModalClick}
      />

      <VerticalSpacer>
        <Heading text="LR/MS Player" size="big" />

        <HelpToggleButton
          showHelp={state.showHelp}
          handleShowHelpClick={state.handleShowHelpClick}
        />

        <LrmsAbout showAbout={state.showHelp} />

        <HelpMessage
          showHelp={state.showHelp}
          content={lrmsPlayerHelpText.selectFilesHelp}
        />

        <FileSelectButton
          id={"lrms-player-file-select"}
          label="Select Audio File"
          allowedFileTypes={['MP3']}
          disabled={state.isLoading}
          onChange={state.handleUploadFilesChange}
        />

        <SelectedFiles uploadFiles={state.uploadFiles} singular={true} />

        <HelpMessage
          showHelp={state.showHelp}
          content={lrmsPlayerHelpText.lrmsButtonsHelp}
        />

        <AudioPlayer
          disabled={!state.uploadFiles}
          audioPath={""}
          audioRef={state.audioElementRef}
          onPlay={state.handlePlay}
          onPause={state.handlePause}
        />

        <LrmsButtons
          handleSignalSelectionClick={state.handleSignalSelectionClick}
          selectedSignal={state.selectedSignal}
        />

        <HelpMessage
          showHelp={state.showHelp}
          content={lrmsPlayerHelpText.playbackSpeedHelp}
        />

        <Checkbox
          label="Set Playback Speed"
          checked={state.usePlaybackSpeedSelector}
          onChange={state.handleUsePlaybackSpeedSelectorChange}
        />

        <FadeContainerStatic show={state.usePlaybackSpeedSelector}>
          <Dropdown
            label="Playback Speed"
            onChange={state.handlePlaybackSpeedChange}
            value={state.playbackSpeed}
          >
            <PlaybackSpeedOptions />
          </Dropdown>
        </FadeContainerStatic>

        <HelpMessage
          showHelp={state.showHelp}
          content={lrmsPlayerHelpText.startTimeControlsHelp}
        />

        <Checkbox
          label="Use Start Time Controls"
          checked={state.useStartTimeSelector}
          onChange={state.handleUseStartTimeSelectorClick}
        />

        <FadeContainerStatic show={state.useStartTimeSelector}>
          <StartTimeControls
            isPlaying={state.isPlaying}
            handlePlay={state.handlePlay}
            handlePause={state.handlePause}
            uploadFiles={state.uploadFiles}
            lengthMinutes={state.lengthMinutes}
            startTimeMinutes={state.startTimeMinutes}
            startTimeSeconds={state.startTimeSeconds}
            selectableSeconds={state.selectableSeconds}
            playFromSelectedTime={state.playFromSelectedTime}
            handleStartTimeMinutesChange={state.handleStartTimeMinutesChange}
            handleStartTimeSecondsChange={state.handleStartTimeSecondsChange}
          />
        </FadeContainerStatic>

        <HelpMessage
          showHelp={state.showHelp}
          content={lrmsPlayerHelpText.resetHelp}
        />

        <Button label="Reset" onClick={state.handleReset} />
      </VerticalSpacer>
    </>
  );
};

export default LrmsPlayer;
