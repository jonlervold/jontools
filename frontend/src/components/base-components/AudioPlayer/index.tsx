import { FC } from "react";
import "./AudioPlayer.css";

type Props = {
  audioPath: string;
  audioRef?: React.MutableRefObject<HTMLAudioElement | null>;
  onEnded?: () => void;
};

/**
 * A component that renders an audio player.
 */
const AudioPlayer: FC<Props> = ({
  audioPath,
  audioRef = null,
  onEnded = () => {},
}) => {
  return (
    <audio
      className="audio-player__player"
      ref={audioRef}
      onEnded={onEnded}
      preload="auto"
      controls
    >
      <source src={audioPath} type="audio/mpeg" />
    </audio>
  );
};

export default AudioPlayer;
