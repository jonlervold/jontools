import "./HorizontalSpacer.css";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * This component creates a row flexbox container with a gap between the children.
 * Used to keep spacing uniform across the app without needing to add duplicate styling all over.
 */
const HorizontalSpacer: FC<Props> = ({ children }) => {
  return <span className="horizontal-spacer__container">{children}</span>;
};

export default HorizontalSpacer;
