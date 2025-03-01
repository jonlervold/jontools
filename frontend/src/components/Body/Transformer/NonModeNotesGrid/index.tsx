import transformNoteAdjustmentToFlatsAndSharps from "../../../../util/transformNoteAdjustmentToFlatsAndSharps";
import { ValidTransformationAdjustments } from "../../../../types/ValidTransformationAdjustments";
import { AdjustDirectionOptions } from "../../../../types/AdjustDirectionOptions";
import { TransformationMap } from "../../../../types/TransformationMap";
import VerticalSpacer from "../../../base-components/VerticalSpacer";
import { NOTES, ValidNotes } from "../../../../types/ValidNotes";
import { ValidModes } from "../../../../types/ValidModes";
import Dropdown from "../../../base-components/Dropdown";
import "./NonModeNotesGrid.css";
import { FC } from "react";

type Props = {
  snapDirection: AdjustDirectionOptions;
  handleUpdateSnapDirection: (direction: AdjustDirectionOptions) => void;
  nonModeNotesTransformationMap: Partial<TransformationMap>;
  inputRoot: ValidNotes;
  inputMode: ValidModes;
  outputMode: ValidModes;
};

/**
 * A component that renders the "Snap Non-Mode Input Notes to Output Mode" section of the MIDI Transformer feature.
 */
const NonModeNotesGrid: FC<Props> = ({
  snapDirection,
  handleUpdateSnapDirection,
  nonModeNotesTransformationMap,
  inputRoot,
  inputMode,
  outputMode,
}) => {
  // Returns the correct note for each non-mode note transformation
  const getSnappedOutputNote = (
    note: keyof TransformationMap,
    noteAdjustment: ValidTransformationAdjustments
  ): ValidNotes => {
    const noteIndex = NOTES.indexOf(note);

    // transposedIndex ensures that when shifting notes:
    // - Going below the first note wraps around to the end
    // - Going above the last note wraps around to the beginning
    //
    // noteIndex + noteAdjustment moves to the new note
    // + NOTES.length ensures negative numbers stay positive
    // % NOTES.length wraps noteAdjustments around when they exceed bounds
    const transposedIndex =
      (noteIndex + noteAdjustment + NOTES.length) % NOTES.length;

    // Final correct note for noteAdjustment
    const transposedNote = NOTES[transposedIndex];

    return transposedNote;
  };

  return (
    <VerticalSpacer>
      <Dropdown
        label="Snap Direction"
        value={snapDirection}
        onChange={(e) =>
          handleUpdateSnapDirection(e.target.value as AdjustDirectionOptions)
        }
      >
        <option value="up">Up</option>
        <option value="down">Down</option>
      </Dropdown>

      <div className="non-mode-notes-grid__grid">
        <div className="non-mode-notes-grid__grid-item">
          Notes Outside {inputRoot} {inputMode}
        </div>

        {Object.keys(nonModeNotesTransformationMap).map((note, index) => (
          <div key={index} className="non-mode-notes-grid__grid-item">
            {note}
          </div>
        ))}

        <div className="non-mode-notes-grid__grid-item">Transformation</div>

        {Object.values(nonModeNotesTransformationMap).map(
          (noteAdjustment, index) => (
            <div key={index} className="non-mode-notes-grid__grid-item">
              {transformNoteAdjustmentToFlatsAndSharps(noteAdjustment)}
            </div>
          )
        )}

        <div className="non-mode-notes-grid__grid-item">
          Snapped to {inputRoot} {outputMode}
        </div>

        {Object.entries(nonModeNotesTransformationMap).map(
          ([note, noteAdjustment], index) => (
            <div key={index} className="non-mode-notes-grid__grid-item">
              {getSnappedOutputNote(note as ValidNotes, noteAdjustment)}
            </div>
          )
        )}
      </div>
    </VerticalSpacer>
  );
};

export default NonModeNotesGrid;
