import VerticalSpacer from "../../base-components/VerticalSpacer";
import Heading from "../../base-components/Heading";
import { Link } from "wouter";
import { FC } from "react";

/**
 * The home page of the app.
 */
const Home: FC = () => {
  const headingTextAlign = "left";

  return (
    <VerticalSpacer>
      <Heading text="About" size="small" textAlign={headingTextAlign} />

      <div>
        Hi, I'm Jon Lervold, and this is jontools: a collection of various
        coding projects I've built that serve practical, experimental, or fun
        purposes. Each tool found here came about either from facing a problem
        where no existing solution quite fit my needs or simply because I
        thought it would be interesting to create.
      </div>

      <Heading
        text="Available Here"
        size="small"
        textAlign={headingTextAlign}
        topMargin={true}
      />

      <div>
        <Link href="/midi-inverter">MIDI Inverter</Link>
        <div>Takes MIDI files and flips all of the pitches upside down.</div>
      </div>

      <div>
        <Link href="/midi-transformer">MIDI Transformer</Link>
        <div>
          Takes MIDI files and changes the pitches of notes based on user
          selection.
        </div>
      </div>

      <Heading
        text="Hosted Elsewhere"
        size="small"
        textAlign={headingTextAlign}
        topMargin={true}
      />

      <div>
        <a href="https://colorhorizons.com" target="_blank">
          Color Horizons
        </a>
        <div>
          My first big coding project, a microtonal-capable scale generator and
          synthesizer.
        </div>
      </div>

      <div>
        {/* JT-2 - Change to correct link */}
        <a href="https://github.com" target="_blank">
          jontools GitHub
        </a>
        <div>The GitHub repository for this project.</div>
      </div>

      <div>
        <a href="https://jonlervold.com" target="_blank">
          jonlervold.com
        </a>
        <div>My homepage on interweb.</div>
      </div>
    </VerticalSpacer>
  );
};

export default Home;
