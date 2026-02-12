import { FC } from "react";
import "./AudioPlayer.css";

type Props = {
  disabled?: boolean;
  audioPath?: string;
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  onEnded?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
};

/**
 * A component that renders an audio player.
 */
const AudioPlayer: FC<Props> = ({
  disabled = false,
  audioPath = "",
  audioRef = null,
  onEnded = () => {},
  onPlay = () => {},
  onPause = () => {},
}) => {
  let playerClass = "audio-player__player";
  if (disabled) {
    playerClass += " audio-player__player-disable-hover";
  }

  return (
    <audio
      className={playerClass}
      ref={audioRef}
      onEnded={onEnded}
      onPlay={onPlay}
      onPause={onPause}
      preload="auto"
      controls
      controlsList="nodownload noplaybackrate"
    >
      <source src={audioPath} type="audio/mpeg" />
    </audio>
  );
};

export default AudioPlayer;
