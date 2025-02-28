import { FC } from "react";
import "./Heading.css";

type Props = {
  size: "very-big" | "big" | "medium" | "small";
  text: string;
  textAlign?: "left" | "center";
  topMargin?: boolean;
};

/**
 * A component that renders a heading text element.
 */
const Heading: FC<Props> = ({
  size,
  text,
  textAlign = "center",
  topMargin = false,
}) => {
  const marginTopSize = topMargin ? "1.25rem" : "none";

  const headingStyling: React.CSSProperties = {
    textAlign: textAlign,
    marginTop: marginTopSize,
  };

  return (
    <div className={"heading__main heading__" + size} style={headingStyling}>
      {text}
    </div>
  );
};

export default Heading;
