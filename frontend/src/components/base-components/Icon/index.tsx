import CircleInfoIcon from "./CircleInfoIcon";
import PlayIcon from "./PlayIcon";
import { FC } from "react";

type IconProps = {
  icon: "play" | "circle-info";
  className?: string;
  style?: React.CSSProperties;
};

/**
 * A component that renders an icon from the icon assets library.
 */
const Icon: FC<IconProps> = ({ icon, className = "", style = {} }) => {
  const styleWithDefaults = {
    width: "1rem",
    height: "1rem",
    ...style,
  };

  let SvgComponent = null;
  switch (icon) {
    case "play":
      SvgComponent = PlayIcon;
      break;
    case "circle-info":
      SvgComponent = CircleInfoIcon;
      break;
    default:
      return null;
  }
  return <SvgComponent className={className} style={styleWithDefaults} />;
};

export default Icon;
