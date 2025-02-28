import { AudioPlaylistArray } from "../../../../types/AudioPlaylistArray";
import VerticalSpacer from "../../../base-components/VerticalSpacer";
import AudioPlaylist from "../../../base-components/AudioPlaylist";
import HelpMessage from "../../../base-components/HelpMessage";
import Heading from "../../../base-components/Heading";
import { FC } from "react";

type Props = {
  showAbout: boolean;
};

/**
 * A component that renders the about section for the MIDI Transformer feature.
 */
const TransformerAbout: FC<Props> = ({ showAbout }) => {
  const headingTextAlign = "left";

  const transformerExamplesPlaylist: AudioPlaylistArray = [
    {
      grouping: "Twinkle Twinkle Little Star",
      currentlyPlayingTitle: "Twinkle Twinkle Little Star - Original, C Ionian",
      playlistTitle: "Original - C Ionian",
      src: "https://bigname.org/jontools/twinkle-major.mp3",
    },
    {
      currentlyPlayingTitle:
        "Twinkle Twinkle Little Star - Transformed, C Aeolian",
      playlistTitle: "Transformed - C Aeolian",
      src: "https://bigname.org/jontools/twinkle-minor.mp3",
    },
    {
      grouping: "The Star Spangled Banner",
      currentlyPlayingTitle: "The Star Spangled Banner - Original, Bb Major",
      playlistTitle: "Original - Bb Major",
      src: "https://bigname.org/jontools/spangled-major.mp3",
    },
    {
      currentlyPlayingTitle:
        "The Star Spangled Banner - Transformed, Bb Aeolian",
      playlistTitle: "Transformed - Bb Aeolian",
      src: "https://bigname.org/jontools/spangled-minor.mp3",
    },
    {
      grouping: "We Three Kings of Orient Are",
      currentlyPlayingTitle:
        "We Three Kings of Orient Are - Original, D Aeolian",
      playlistTitle: "Original - D Aeolian",
      src: "https://bigname.org/jontools/kings-minor.mp3",
    },
    {
      currentlyPlayingTitle:
        "We Three Kings of Orient Are - Transformed, D Ionian",
      playlistTitle: "Transformed - D Ionian",
      src: "https://bigname.org/jontools/kings-major.mp3",
    },
    {
      grouping: "Canon in D",
      currentlyPlayingTitle: "Canon in D - Original, D Ionian",
      playlistTitle: "Original - D Ionian",
      src: "https://bigname.org/jontools/canon-major.mp3",
    },
    {
      currentlyPlayingTitle: "Canon in D - Transformed, D Aeolian",
      playlistTitle: "Transformed - D Aeolian",
      src: "https://bigname.org/jontools/canon-minor.mp3",
    },
  ];

  return (
    <HelpMessage showHelp={showAbout}>
      <Heading text="About" size="small" textAlign={headingTextAlign} />

      <div>
        <span className="help-message__bold-text">MIDI Transformer</span> is a
        tool for transforming the notes of MIDI files based on user selections.
        Two transformation methods are available for use:
      </div>

      <ol className="help-message__ordered-list">
        <VerticalSpacer>
          <li>
            <span className="help-message__bold-text">
              Automatic Note Selection
            </span>{" "}
            - Users can specify the root and mode of the input file, then choose
            an output mode. The tool supports all ancohemitonic modes and
            provides a readout displaying how notes will be transformed to match
            the selected modal conversion.
          </li>

          <li>
            <span className="help-message__bold-text">
              Manual Note Selection
            </span>{" "}
            - Users can remap each note of the chromatic scale to any other
            note. Each note can be transposed up or down by up to 11 semitones,
            providing precise control over the transformation process.
          </li>
        </VerticalSpacer>
      </ol>

      <div>
        With these flexible options, MIDI Transformer is a versatile solution
        for restructuring MIDI compositions while preserving musical integrity.
      </div>

      <Heading
        text="Examples"
        size="small"
        textAlign={headingTextAlign}
        topMargin={true}
      />

      <AudioPlaylist playlist={transformerExamplesPlaylist} />
    </HelpMessage>
  );
};

export default TransformerAbout;
