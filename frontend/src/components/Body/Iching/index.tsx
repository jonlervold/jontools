import ichingHelpText from "../../../assets/text/ichingHelpText";
import HelpToggleButton from "../../base-components/HelpToggleButton";
import HorizontalSpacer from "../../base-components/HorizontalSpacer";
import VerticalSpacer from "../../base-components/VerticalSpacer";
import HelpMessage from "../../base-components/HelpMessage";
import { IchingReading } from "../../../types/Iching";
import { flipLine } from "../../../util/iching";
import TextArea from "../../base-components/TextArea";
import Heading from "../../base-components/Heading";
import { useIching } from "../../../hooks/useIching";
import Button from "../../base-components/Button";
import HexagramText from "./HexagramText";
import IchingAbout from "./IchingAbout";
import { FC } from "react";
import "./Iching.css";

type ReadingProps = {
  reading: IchingReading;
  showHelp: boolean;
  onExport: () => void;
};

/**
 * A component that renders a completed I Ching reading.
 */
const ReadingResult: FC<ReadingProps> = ({ reading, showHelp, onExport }) => {
  const headingTextAlign = "left";

  return (
    <>
      {reading.question && (
        <div>
          <span className="iching__label">Question: </span>
          {reading.question}
        </div>
      )}

      <HelpMessage
        showHelp={showHelp}
        content={ichingHelpText.changingLinesHelp}
      />

      {reading.changingPositions.length > 0 && (
        <div className="iching__changing-note">Red lines are changing.</div>
      )}

      <HexagramText
        heading="Primary hexagram"
        hexagram={reading.primary}
        lines={reading.lines}
      />

      {reading.changingPositions.length === 0 && <div>No changing lines.</div>}

      {reading.changingPositions.length > 0 && (
        <VerticalSpacer>
          <Heading
            text="Changing lines"
            size="small"
            textAlign={headingTextAlign}
          />

          {reading.changingPositions.map((position) => {
            const lineText = reading.primary.lines[position - 1];
            return (
              <div key={position}>
                <div className="iching__line-heading">Line {position}</div>
                <div className="iching__oracle">{lineText.oracle}</div>
                {lineText.commentary && (
                  <div className="iching__commentary">{lineText.commentary}</div>
                )}
              </div>
            );
          })}

          {reading.changingPositions.length === 6 && reading.primary.allChanging && (
            <div>
              <div className="iching__line-heading">All lines changing</div>
              <div className="iching__oracle">
                {reading.primary.allChanging.oracle}
              </div>
              {reading.primary.allChanging.commentary && (
                <div className="iching__commentary">
                  {reading.primary.allChanging.commentary}
                </div>
              )}
            </div>
          )}
        </VerticalSpacer>
      )}

      {reading.relating && (
        <HexagramText
          heading="Relating hexagram"
          hexagram={reading.relating}
          lines={reading.lines.map(flipLine)}
        />
      )}

      <Button label="Export Reading" onClick={onExport} />
    </>
  );
};

/**
 * The main component for the I Ching reading feature.
 */
const Iching: FC = () => {
  const state = useIching();

  return (
    <VerticalSpacer>
      <Heading text="I Ching" size="big" />

      <HelpToggleButton
        showHelp={state.showHelp}
        handleShowHelpClick={state.handleShowHelpClick}
      />

      <IchingAbout showAbout={state.showHelp} />

      <HelpMessage
        showHelp={state.showHelp}
        content={ichingHelpText.questionHelp}
      />

      <TextArea
        id="iching-question"
        label="Question"
        value={state.question}
        placeholder="Ask a question, or leave this blank"
        onChange={state.handleQuestionChange}
      />

      <HelpMessage
        showHelp={state.showHelp}
        content={ichingHelpText.castHelp}
      />

      <HorizontalSpacer>
        <Button label="Reset" onClick={state.handleReset} />
        <Button label="Cast Reading" onClick={state.handleCast} />
      </HorizontalSpacer>

      {state.reading && (
        <ReadingResult
          reading={state.reading}
          showHelp={state.showHelp}
          onExport={state.handleExport}
        />
      )}
    </VerticalSpacer>
  );
};

export default Iching;
