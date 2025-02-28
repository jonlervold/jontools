import FadeContainerStatic from "../FadeContainerStatic";
import VerticalSpacer from "../VerticalSpacer";
import { FC } from "react";
import Icon from "../Icon";
import "./HelpMessage.css";

type Props = {
  showHelp: boolean;
  content?: string[];
  children?: React.ReactNode;
};

/**
 * A component that renders a help message element on the feature pages.
 */
const HelpMessage: FC<Props> = ({
  showHelp,
  content = [],
  children = null,
}) => {
  return (
    <FadeContainerStatic show={showHelp}>
      <div className="help-message__container">
        <VerticalSpacer>
          {content &&
            content.map((paragraph, index) => (
              <div key={index}>{paragraph}</div>
            ))}
          {children && children}
        </VerticalSpacer>

        <span className="help-message__info-icon-container">
          <Icon icon="circle-info" />
        </span>
      </div>
    </FadeContainerStatic>
  );
};

export default HelpMessage;
