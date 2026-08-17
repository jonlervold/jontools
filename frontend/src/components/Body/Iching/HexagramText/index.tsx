import VerticalSpacer from "../../../base-components/VerticalSpacer";
import { Hexagram, LineValue } from "../../../../types/Iching";
import { formatHexagramName } from "../../../../util/iching";
import HexagramDrawing from "../HexagramDrawing";
import Heading from "../../../base-components/Heading";
import { FC } from "react";

type Props = {
  heading: string;
  hexagram: Hexagram;
  lines: LineValue[];
};

/**
 * A component that renders one hexagram's drawing, judgment, and image.
 */
const HexagramText: FC<Props> = ({ heading, hexagram, lines }) => {
  const headingTextAlign = "left";

  return (
    <VerticalSpacer>
      <Heading text={heading} size="small" textAlign={headingTextAlign} />

      <div className="iching__hexagram-name">
        {formatHexagramName(hexagram)}
      </div>

      <HexagramDrawing hexagram={hexagram} lines={lines} />

      <Heading text="Judgment" size="small" textAlign={headingTextAlign} />
      <div className="iching__oracle">{hexagram.judgment}</div>
      {hexagram.judgmentCommentary && (
        <div className="iching__commentary">{hexagram.judgmentCommentary}</div>
      )}

      <Heading text="Image" size="small" textAlign={headingTextAlign} />
      <div className="iching__oracle">{hexagram.image}</div>
      {hexagram.imageCommentary && (
        <div className="iching__commentary">{hexagram.imageCommentary}</div>
      )}
    </VerticalSpacer>
  );
};

export default HexagramText;
