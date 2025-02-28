import transformNoteAdjustmentToFlatsAndSharps from "../../../../util/transformNoteAdjustmentToFlatsAndSharps";
import { ValidModes } from "../../../../types/ValidModes";
import { ValidNotes } from "../../../../types/ValidNotes";
import "./TransformationGrid.css";
import { FC } from "react";

type Props = {
  inputRoot: ValidNotes;
  inputMode: ValidModes;
  outputMode: ValidModes;
  inputModeNoteNames: ValidNotes[];
  outputModeNoteNames: ValidNotes[];
  finalInputAdjustment: number[];
};

/**
 * A component that renders the "Transformation Grid" section of the MIDI Transformer feature.
 * This grid displays the input and output notes, and the transformation applied to the input notes.
 */
const TransformationGrid: FC<Props> = ({
  inputRoot,
  inputMode,
  outputMode,
  inputModeNoteNames,
  outputModeNoteNames,
  finalInputAdjustment,
}) => {
  return (
    <>
      <div className="transformation-grid__grid">
        <div className="transformation-grid__grid-item">
          Notes of {inputRoot} {inputMode}
        </div>

        {inputModeNoteNames.map((noteName, index) => (
          <div key={index} className="transformation-grid__grid-item">
            {noteName}
          </div>
        ))}

        <div className="transformation-grid__grid-item">Transformation</div>

        {finalInputAdjustment.map((noteAdjustment, index) => (
          <div key={index} className="transformation-grid__grid-item">
            {transformNoteAdjustmentToFlatsAndSharps(noteAdjustment)}
          </div>
        ))}

        <div className="transformation-grid__grid-item">
          Notes of {inputRoot} {outputMode}
        </div>

        {outputModeNoteNames.map((noteName, index) => (
          <div key={index} className="transformation-grid__grid-item">
            {noteName}
          </div>
        ))}
      </div>
    </>
  );
};

export default TransformationGrid;
