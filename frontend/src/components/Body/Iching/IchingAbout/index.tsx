import HelpMessage from "../../../base-components/HelpMessage";
import Heading from "../../../base-components/Heading";
import { ichingSource } from "../../../../util/iching";
import { FC } from "react";

type Props = {
  showAbout: boolean;
};

/**
 * A component that renders the about section for the I Ching feature.
 */
const IchingAbout: FC<Props> = ({ showAbout }) => {
  const headingTextAlign = "left";

  return (
    <HelpMessage showHelp={showAbout}>
      <Heading text="About" size="small" textAlign={headingTextAlign} />

      <div>
        <span className="help-message__bold-text">I Ching</span> casts a reading
        from the Book of Changes using the three-coin method.
      </div>

      <div>
        For each of the six lines, three coins are thrown. Heads count as 3 and
        tails as 2, so each line totals 6, 7, 8, or 9:
      </div>

      <ol className="help-message__ordered-list">
        <li>6 — old yin: a broken line that is changing</li>
        <li>7 — young yang: a solid line at rest</li>
        <li>8 — young yin: a broken line at rest</li>
        <li>9 — old yang: a solid line that is changing</li>
      </ol>

      <div>
        Lines are stacked from the bottom up. A hexagram is two trigrams: the
        lower three lines and the upper three. Changing lines are drawn in red.
        If any lines change, they also produce a relating hexagram — the figure
        that results when each changing line flips to its opposite.
      </div>

      <div>
        The reading shows the primary hexagram's judgment and image, the texts
        of any changing lines, and the relating hexagram when there is one.
        Oracle text and commentary are from {ichingSource}
      </div>
    </HelpMessage>
  );
};

export default IchingAbout;
