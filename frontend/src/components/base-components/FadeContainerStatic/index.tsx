import { FC, useEffect, useState } from "react";
import "./FadeContainerStatic.css";

type Props = {
  show: boolean;
  children: React.ReactNode;
};

/**
 * This component is used to fade in and out a static element on the page.
 * It is used to create a smooth transition when the element is hidden or shown.
 */
const FadeContainerStatic: FC<Props> = ({ show, children }) => {
  /**
   * Keeps track of whether the element is visible.
   */
  const [isVisible, setIsVisible] = useState<boolean>(show);

  /**
   * When the show prop changes, the element is either shown or hidden.
   */
  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 900);

      // Cleanup timeout if component unmounts or 'show' changes quickly
      return () => clearTimeout(timeout);
    }
  }, [show]);

  const fadeStateClass = show
    ? "fade-container-static__fade-in"
    : "fade-container-static__fade-out";

  return <>{isVisible && <div className={fadeStateClass}>{children}</div>}</>;
};

export default FadeContainerStatic;
