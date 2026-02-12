import "./HorizontalSpacer.css";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
  gapSize?: string;
};

/**
 * This component creates a row flexbox container with a gap between the children.
 * Used to keep spacing uniform across the app without needing to add duplicate styling all over.
 */
const HorizontalSpacer: FC<Props> = ({ children, gapSize = "0.75rem" }) => {
  const gapStyling = { gap: gapSize };
  return (
    <span className="horizontal-spacer__container" style={gapStyling}>
      {children}
    </span>
  );
};

export default HorizontalSpacer;
