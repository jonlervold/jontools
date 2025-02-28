import { AudioPlaylistArray } from "../../../../types/AudioPlaylistArray";
import AudioPlaylist from "../../../base-components/AudioPlaylist";
import HelpMessage from "../../../base-components/HelpMessage";
import Heading from "../../../base-components/Heading";
import { FC } from "react";

type Props = {
  showAbout: boolean;
};

/**
 * A component that renders the about section for the MIDI Inverter feature.
 */
const InverterAbout: FC<Props> = ({ showAbout }) => {
  const headingTextAlign = "left";

  const inverterExamplesPlaylist: AudioPlaylistArray = [
    {
      grouping: "Twinkle Twinkle Little Star",
      currentlyPlayingTitle: "Twinkle Twinkle Little Star - Original",
      playlistTitle: "Original",
      src: "https://bigname.org/jontools/twinkle-major.mp3",
    },
    {
      currentlyPlayingTitle: "Twinkle Twinkle Little Star - Inverted",
      playlistTitle: "Inverted",
      src: "https://bigname.org/jontools/twinkle-inverted.mp3",
    },
    {
      grouping: "The Star Spangled Banner",
      currentlyPlayingTitle: "The Star Spangled Banner - Original",
      playlistTitle: "Original",
      src: "https://bigname.org/jontools/spangled-major.mp3",
    },
    {
      currentlyPlayingTitle: "The Star Spangled Banner - Inverted",
      playlistTitle: "Inverted",
      src: "https://bigname.org/jontools/spangled-inverted.mp3",
    },
    {
      grouping: "We Three Kings of Orient Are",
      currentlyPlayingTitle: "We Three Kings of Orient Are - Original",
      playlistTitle: "Original",
      src: "https://bigname.org/jontools/kings-minor.mp3",
    },
    {
      currentlyPlayingTitle: "We Three Kings of Orient Are - Inverted",
      playlistTitle: "Inverted",
      src: "https://bigname.org/jontools/kings-inverted.mp3",
    },
    {
      grouping: "Canon in D",
      currentlyPlayingTitle: "Canon in D - Original",
      playlistTitle: "Original",
      src: "https://bigname.org/jontools/canon-major.mp3",
    },
    {
      currentlyPlayingTitle: "Canon in D - Inverted",
      playlistTitle: "Inverted",
      src: "https://bigname.org/jontools/canon-inverted.mp3",
    },
  ];

  return (
    <HelpMessage showHelp={showAbout}>
      <Heading text="About" size="small" textAlign={headingTextAlign} />

      <div>
        <span className="help-message__bold-text">MIDI Inverter</span> is a tool
        for inverting the pitches of MIDI files while preserving the overall
        register of each track.
      </div>

      <div>
        This tool transforms each MIDI note (0-127) of the original composition
        into its mirror image (127-0). This results in all of the melodic and
        harmonic content being inverted. Ascending melodic sections in the
        original MIDI file will descend in the inversion and vice versa. Major
        sections become minor and vice versa. Intriguingly, this process handles
        advanced musical concepts like key changes and modal interchange
        seamlessly. In addition to inverting all of the note values, this tool
        also inverts pitch bends, ensuring that pitch-bend-based note changes
        also remain in key in the final result.
      </div>

      <div>
        Unlike other MIDI inverters, this tool includes an octave-matching
        function. It analyzes the original content of each MIDI track, averaging
        the note values to determine the track's primary register. Once the
        inversion is applied, the tool transposes the track up or down as needed
        to maintain its original octave placement. For many MIDI compositions,
        this will successfully return bass tracks to the bass range and treble
        tracks to the treble range.
      </div>

      <div>
        With this enhanced functionality, MIDI Inverter provides a refined
        approach to harmonic and melodic inversion while preserving the natural
        balance of multi-track compositions.
      </div>

      <Heading
        text="Examples"
        size="small"
        textAlign={headingTextAlign}
        topMargin={true}
      />

      <AudioPlaylist playlist={inverterExamplesPlaylist} />
    </HelpMessage>
  );
};

export default InverterAbout;
