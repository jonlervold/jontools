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
 * A component that renders the about section for the LR/MS Player feature.
 */
const LrmsAbout: FC<Props> = ({ showAbout }) => {
  const headingTextAlign = "left";

  // TODO create and upload examples
  const lrmsExamplesPlaylist: AudioPlaylistArray = [
    {
      grouping: "Demo - Bird Surgeon - Mule Mural",
      currentlyPlayingTitle: "Original Stereo",
      playlistTitle: "Original Stereo",
      src: "https://bigname.org/jontools/lrms-original.mp3",
    },
    {
      currentlyPlayingTitle: "Left Channel",
      playlistTitle: "Left",
      src: "https://bigname.org/jontools/lrms-left.mp3",
    },
    {
      currentlyPlayingTitle: "Right Channel",
      playlistTitle: "Right",
      src: "https://bigname.org/jontools/lrms-right.mp3",
    },
    {
      currentlyPlayingTitle: "Mid Channel",
      playlistTitle: "Mid",
      src: "https://bigname.org/jontools/lrms-mid.mp3",
    },
    {
      currentlyPlayingTitle: "Side Channel",
      playlistTitle: "Side",
      src: "https://bigname.org/jontools/lrms-side.mp3",
    },
  ];

  return (
    <HelpMessage showHelp={showAbout}>
      <Heading text="About" size="small" textAlign={headingTextAlign} />

      <div>
        <span className="help-message__bold-text">LR/MS Player</span> is a tool
        designed to isolate and manipulate audio signals for enhanced analysis
        and transcribability. This tool offers several key capabilities:
      </div>

      <ol className="help-message__ordered-list">
        <VerticalSpacer>
          <li>
            <span className="help-message__bold-text">Signal Separation</span> -
            The LR/MS Player can separate left, right, mid, and side signals
            from audio recordings.
          </li>

          <li>
            <span className="help-message__bold-text">Speed Adjustment</span> -
            The tool provides fine control over playback speed, enabling users
            to slow down or speed up the audio without altering pitch.
          </li>

          <li>
            <span className="help-message__bold-text">Playback Control</span> -
            Users can start or restart playback at specific timestamps, allowing
            for repeated examination of individual sections of the recording.
          </li>
        </VerticalSpacer>
      </ol>

      <div>
        By leveraging these features, the LR/MS Player helps with detailed
        dissection of stereo audio recordings.
      </div>

      <Heading
        text="Examples"
        size="small"
        textAlign={headingTextAlign}
        topMargin={true}
      />

      <AudioPlaylist playlist={lrmsExamplesPlaylist} />
    </HelpMessage>
  );
};

export default LrmsAbout;
