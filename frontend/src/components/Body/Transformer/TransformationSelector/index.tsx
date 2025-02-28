import { TransformationMap } from "../../../../types/TransformationMap";
import Dropdown from "../../../base-components/Dropdown";
import { NOTES } from "../../../../types/ValidNotes";
import "./TransformationSelector.css";
import React, { FC } from "react";
import {
  VALID_TRANSFORMATION_ADJUSTMENTS,
  ValidTransformationAdjustments,
} from "../../../../types/ValidTransformationAdjustments";

type Props = {
  transformationMap: TransformationMap;
  handleUpdateTransformationMap: (
    note: keyof TransformationMap,
    noteAdjustment: ValidTransformationAdjustments
  ) => void;
};

/**
 * A component that renders the "Manual Note Selection" section of the MIDI Transformer feature.
 * This section contains a grid of dropdowns that allow the user to select the transformation for each note.
 */
const TransformationSelector: FC<Props> = ({
  transformationMap,
  handleUpdateTransformationMap,
}) => {
  // Returns the correct option label for each dropdown option
  // ex: +1 - F
  const getOptionLabel = (
    note: keyof TransformationMap,
    noteAdjustment: ValidTransformationAdjustments
  ): string => {
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

    // Negative numbers already appear with their sign, and there should be no sign for 0
    const potentialPlusSign = noteAdjustment > 0 ? "+" : "";

    return `${potentialPlusSign}${noteAdjustment} - ${transposedNote}`;
  };

  return (
    <div className="transformation-selector__grid">
      {/* Create an array of controlled dropdowns
          Notes are reversed so they ascend in the UI*/}
      {[...NOTES].reverse().map((note) => (
        <React.Fragment key={note}>
          <div className="transformation-selector__grid-item">{note}</div>

          <div>
            <Dropdown
              value={transformationMap[note]}
              onChange={(e) =>
                handleUpdateTransformationMap(
                  note,
                  Number(e.target.value) as ValidTransformationAdjustments
                )
              }
            >
              {/* Generate dropdown options with note names */}
              {Array.from(VALID_TRANSFORMATION_ADJUSTMENTS).map(
                (noteAdjustment) => (
                  <option key={noteAdjustment} value={noteAdjustment}>
                    {getOptionLabel(note, noteAdjustment)}
                  </option>
                )
              )}
            </Dropdown>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default TransformationSelector;
