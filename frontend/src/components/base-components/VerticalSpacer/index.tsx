import "./VerticalSpacer.css";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * This component creates a column flexbox container with a gap between the children.
 * Used to keep spacing uniform across the app without needing to add duplicate styling all over.
 */
const VerticalSpacer: FC<Props> = ({ children }) => {
  return <div className="vertical-spacer__wrapper">{children}</div>;
};

export default VerticalSpacer;
