import { AudioPlaylistArray } from "../../../types/AudioPlaylistArray";
import { useState, useRef, FC } from "react";
import AudioPlayer from "../AudioPlayer";
import "./AudioPlaylist.css";
import Icon from "../Icon";

type Props = {
  playlist: AudioPlaylistArray;
};

/**
 * A component that renders an audio player with a list of selectable tracks.
 */
const AudioPlaylist: FC<Props> = ({ playlist }) => {
  /**
   * Keeps track of which track is currently selected for playback.
   */
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);

  /**
   * Holds a reference to the audio element.
   * Allows the AudioPlaylist component to control the audio playback in the AudioPlayer component
   *   by directly accessing the DOM audio element.
   */
  const audioRef = useRef<HTMLAudioElement | null>(null);

  /**
   * If the user clicks the already selected track in the playlist, restart it.
   * Otherwise, switch to the selected track.
   */
  const handleSelectTrackClick = (selectedTrackIndex: number) => {
    selectedTrackIndex === currentTrackIndex
      ? startTrackFromBeginning()
      : switchToTrack(selectedTrackIndex);
  };

  /**
   * Starts or restarts a track.
   */
  const startTrackFromBeginning = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  /**
   * Switches to a different track and starts it.
   */
  const switchToTrack = (selectedTrackIndex: number) => {
    setCurrentTrackIndex(selectedTrackIndex);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  /**
   * Switches to the next track automatically if there is another to play.
   */
  const autoAdvanceToNextTrack = () => {
    if (currentTrackIndex < playlist.length - 1) {
      switchToTrack(currentTrackIndex + 1);
    }
  };

  /**
   * Returns the classes for the grouping heading.
   * Makes the first grouping not have a top margin, since the audio player styling
   *   results in an implicit margin already.
   */
  const groupingClasses = (index: number) => {
    let classes = "audio-playlist__track-grouping-heading";
    const isFirstGrouping = index === 0;
    classes += isFirstGrouping
      ? " audio-playlist__track-grouping-heading-first"
      : "";

    return classes;
  };

  return (
    <div className="audio-playlist__container">
      <div className="audio-playlist__currently-playing">
        {playlist[currentTrackIndex].currentlyPlayingTitle}
      </div>

      <AudioPlayer
        audioRef={audioRef}
        audioPath={playlist[currentTrackIndex].src}
        onEnded={autoAdvanceToNextTrack}
      />

      <div>
        {playlist.map((track, index) => (
          <div key={index} className="audio-playlist__tracks-grid">
            {track.grouping && (
              <>
                <div></div>
                <div className={groupingClasses(index)}>{track.grouping}</div>
              </>
            )}

            <div className="audio-playlist__tracks-grid-now-playing-indicator">
              {index === currentTrackIndex ? <Icon icon="play" /> : ""}
            </div>
            <a onClick={() => handleSelectTrackClick(index)}>
              {track.playlistTitle}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPlaylist;
