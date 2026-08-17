import { Hexagram, LineValue } from "../../../../types/Iching";
import { isChangingLine, isYangLine } from "../../../../util/iching";
import { formatTrigramLabel } from "../../../../util/trigrams";
import { FC } from "react";
import "./HexagramDrawing.css";

type Props = {
  hexagram: Hexagram;
  lines: LineValue[];
};

const SVG_WIDTH = 120;
const LINE_WIDTH = 108;
const LINE_THICKNESS = 10;
const LINE_GAP = 10;
const YIN_GAP = 16;
const PADDING_X = 6;
const PADDING_Y = 6;

/**
 * Draws a hexagram as six stacked lines, with line 1 at the bottom.
 * Changing lines use the same shape as stable lines, in red.
 */
const HexagramDrawing: FC<Props> = ({ hexagram, lines }) => {
  const svgHeight =
    PADDING_Y * 2 +
    lines.length * LINE_THICKNESS +
    (lines.length - 1) * LINE_GAP;

  return (
    <div className="hexagram-drawing__container">
      <svg
        className="hexagram-drawing__svg"
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        width={SVG_WIDTH}
        height={svgHeight}
        role="img"
        aria-label={hexagram.title}
      >
        {[...lines].reverse().map((line, visualIndex) => {
          const y = PADDING_Y + visualIndex * (LINE_THICKNESS + LINE_GAP);
          const fill = isChangingLine(line)
            ? "var(--color-iching-line-changing)"
            : "var(--color-iching-line-stable)";

          if (isYangLine(line)) {
            return (
              <rect
                key={visualIndex}
                x={PADDING_X}
                y={y}
                width={LINE_WIDTH}
                height={LINE_THICKNESS}
                fill={fill}
              />
            );
          }

          const segmentWidth = (LINE_WIDTH - YIN_GAP) / 2;
          return (
            <g key={visualIndex}>
              <rect
                x={PADDING_X}
                y={y}
                width={segmentWidth}
                height={LINE_THICKNESS}
                fill={fill}
              />
              <rect
                x={PADDING_X + segmentWidth + YIN_GAP}
                y={y}
                width={segmentWidth}
                height={LINE_THICKNESS}
                fill={fill}
              />
            </g>
          );
        })}
      </svg>

      <div className="hexagram-drawing__labels">
        <div>above: {formatTrigramLabel(hexagram.above)}</div>
        <div>below: {formatTrigramLabel(hexagram.below)}</div>
      </div>
    </div>
  );
};

export default HexagramDrawing;
