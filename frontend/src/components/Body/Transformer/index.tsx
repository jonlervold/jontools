import transformFormulaToFlatsAndSharps from "../../../util/transformFormulaToFlatsAndSharps";
import transformationHelpText from "../../../assets/text/transformationHelpText";
import FadeContainerDynamic from "../../base-components/FadeContainerDynamic";
import FadeContainerStatic from "../../base-components/FadeContainerStatic";
import FileSelectButton from "../../base-components/FileSelectButton";
import HelpToggleButton from "../../base-components/HelpToggleButton";
import HorizontalSpacer from "../../base-components/HorizontalSpacer";
import LoadingIndicator from "../../base-components/LoadingIndicator";
import VerticalSpacer from "../../base-components/VerticalSpacer";
import SelectedFiles from "../../base-components/SelectedFiles";
import { useTransformer } from "../../../hooks/useTransformer";
import TransformationSelector from "./TransformationSelector";
import ErrorReadout from "../../base-components/ErrorReadout";
import HelpMessage from "../../base-components/HelpMessage";
import { flattenedModes } from "../../../types/ValidModes";
import TransformationGrid from "./TransformationGrid";
import Checkbox from "../../base-components/Checkbox";
import Dropdown from "../../base-components/Dropdown";
import Heading from "../../base-components/Heading";
import { NOTES } from "../../../types/ValidNotes";
import NonModeNotesGrid from "./NonModeNotesGrid";
import TransformerAbout from "./TransformerAbout";
import Button from "../../base-components/Button";
import { FC } from "react";

/**
 * The main component for the MIDI Transformer feature.
 */
const Transformer: FC = () => {
  const state = useTransformer();

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
        <Heading text="MIDI Transformer" size="big" />

        <HelpToggleButton
          showHelp={state.showHelp}
          handleShowHelpClick={state.handleShowHelpClick}
        />

        <TransformerAbout showAbout={state.showHelp} />

        <HelpMessage
          showHelp={state.showHelp}
          content={transformationHelpText.selectFilesHelp}
        />

        <FileSelectButton
          id={"transformer-file-select"}
          disabled={state.isLoading}
          onChange={state.handleUploadFilesChange}
        />

        <SelectedFiles uploadFiles={state.uploadFiles} />

        <HelpMessage
          showHelp={state.showHelp}
          content={transformationHelpText.automaticOrManualHelp}
        />

        <Checkbox
          label="Use Automatic Note Selection"
          checked={state.useAutoSelector}
          disabled={state.isLoading}
          onChange={state.handleUseAutoSelectorChange}
        />

        <FadeContainerDynamic fadeTriggers={state.useAutoSelector}>
          <VerticalSpacer>
            {state.useAutoSelector && (
              <>
                <Heading text="Automatic Note Selection" size="medium" />

                <Dropdown
                  label="Input Root"
                  value={state.inputRoot}
                  onChange={(e) =>
                    state.handleUpdateAutoSelectorDropdown(
                      "inputRoot",
                      e.target.value
                    )
                  }
                >
                  {[...NOTES].reverse().map((note) => (
                    <option key={note} value={note}>
                      {note}
                    </option>
                  ))}
                </Dropdown>

                <Dropdown
                  label="Input Mode"
                  value={state.inputMode}
                  onChange={(e) =>
                    state.handleUpdateAutoSelectorDropdown(
                      "inputMode",
                      e.target.value
                    )
                  }
                >
                  {flattenedModes.map((mode) => (
                    <option key={mode.modeName} value={mode.modeName}>
                      {mode.parentScaleName} - {mode.modeName} -{" "}
                      {transformFormulaToFlatsAndSharps(mode.modeFormula)}
                    </option>
                  ))}
                </Dropdown>

                <Dropdown
                  label="Output Mode"
                  value={state.outputMode}
                  onChange={(e) =>
                    state.handleUpdateAutoSelectorDropdown(
                      "outputMode",
                      e.target.value
                    )
                  }
                >
                  {flattenedModes.map((mode) => (
                    <option key={mode.modeName} value={mode.modeName}>
                      {mode.parentScaleName} - {mode.modeName} -{" "}
                      {transformFormulaToFlatsAndSharps(mode.modeFormula)}
                    </option>
                  ))}
                </Dropdown>

                <TransformationGrid
                  inputRoot={state.inputRoot}
                  inputMode={state.inputMode}
                  outputMode={state.outputMode}
                  inputModeNoteNames={state.inputModeNoteNames}
                  outputModeNoteNames={state.outputModeNoteNames}
                  finalInputAdjustment={state.finalInputAdjustment}
                />

                <HelpMessage
                  showHelp={state.showHelp}
                  content={transformationHelpText.snapNonModeInputNotesHelp}
                />

                <Checkbox
                  label="Snap Non-Mode Input Notes to Output Mode"
                  checked={state.snapNonModeNotes}
                  disabled={state.isLoading}
                  onChange={state.handleSnapNonModeNotesClick}
                />

                <FadeContainerStatic show={state.snapNonModeNotes}>
                  <NonModeNotesGrid
                    snapDirection={state.snapDirection}
                    handleUpdateSnapDirection={state.handleUpdateSnapDirection}
                    nonModeNotesTransformationMap={
                      state.nonModeNotesTransformationMap
                    }
                    inputRoot={state.inputRoot}
                    inputMode={state.inputMode}
                    outputMode={state.outputMode}
                  />
                </FadeContainerStatic>
              </>
            )}

            {!state.useAutoSelector && (
              <>
                <Heading text="Manual Note Selection" size="medium" />

                <TransformationSelector
                  transformationMap={state.transformationMap}
                  handleUpdateTransformationMap={
                    state.handleUpdateTransformationMap
                  }
                />
              </>
            )}
          </VerticalSpacer>
        </FadeContainerDynamic>

        <HelpMessage
          showHelp={state.showHelp}
          content={transformationHelpText.removePitchBendsHelp}
        />

        <Checkbox
          label="Remove Pitch Bends"
          checked={state.removePitchBends}
          disabled={state.isLoading}
          onChange={state.handleRemovePitchBendsClick}
        />

        <HelpMessage
          showHelp={state.showHelp}
          content={transformationHelpText.skipTrackTenHelp}
        />

        <Checkbox
          label="Skip Track Ten"
          checked={state.skipTrackTen}
          disabled={state.isLoading}
          onChange={state.handleSkipTrackTenChange}
        />

        <HelpMessage
          showHelp={state.showHelp}
          content={transformationHelpText.resetSubmitHelp}
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

export default Transformer;
