import inversionHelpText from "../../../assets/text/inversionHelpText";
import FileSelectButton from "../../base-components/FileSelectButton";
import HelpToggleButton from "../../base-components/HelpToggleButton";
import HorizontalSpacer from "../../base-components/HorizontalSpacer";
import LoadingIndicator from "../../base-components/LoadingIndicator";
import VerticalSpacer from "../../base-components/VerticalSpacer";
import SelectedFiles from "../../base-components/SelectedFiles";
import ErrorReadout from "../../base-components/ErrorReadout";
import HelpMessage from "../../base-components/HelpMessage";
import { useInverter } from "../../../hooks/useInverter";
import Checkbox from "../../base-components/Checkbox";
import Heading from "../../base-components/Heading";
import Button from "../../base-components/Button";
import InverterAbout from "./InverterAbout";
import { FC } from "react";

/**
 * The main component for the MIDI Inverter feature.
 */
const Inverter: FC = () => {
  const state = useInverter();

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
        <Heading text="MIDI Inverter" size="big" />

        <HelpToggleButton
          showHelp={state.showHelp}
          handleShowHelpClick={state.handleShowHelpClick}
        />

        <InverterAbout showAbout={state.showHelp} />

        <HelpMessage
          showHelp={state.showHelp}
          content={inversionHelpText.selectFilesHelp}
        />

        <FileSelectButton
          id={"inverter-file-select"}
          disabled={state.isLoading}
          onChange={state.handleUploadFilesChange}
        />

        <SelectedFiles uploadFiles={state.uploadFiles} />

        <HelpMessage
          showHelp={state.showHelp}
          content={inversionHelpText.skipTrackTenHelp}
        />

        <Checkbox
          label="Skip Track Ten"
          checked={state.skipTrackTen}
          disabled={state.isLoading}
          onChange={state.handleSkipTrackTenChange}
        />

        <HelpMessage
          showHelp={state.showHelp}
          content={inversionHelpText.resetSubmitHelp}
        />

        <HorizontalSpacer>
          <Button
            label="Reset"
            onClick={state.handleReset}
            disabled={state.isLoading}
          />

          <Button
            label="Submit"
            onClick={state.handleSubmit}
            disabled={state.isLoading || !state.uploadFiles}
          />
        </HorizontalSpacer>
      </VerticalSpacer>
    </>
  );
};

export default Inverter;
