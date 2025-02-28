import { FC, useEffect, useState } from "react";
import "./FadeContainerDynamic.css";

type Props = {
  fadeTriggers: any;
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
};

type ChildrenStates = {
  previousState: React.ReactNode;
  currentState: React.ReactNode;
};

/**
 * This component is used to smoothly fade between different states in the same location on the page.
 * fadeTriggers can be any element that causes the children to change to an alternative state.
 * children should be conditionally rendered based on the fadeTriggers.
 */
const FadeContainerDynamic: FC<Props> = ({
  fadeTriggers,
  children,
  customStyles = {},
}) => {
  /**
   * fadeTriggerCount is used to prevent the component from fading on initial load.
   * Starts at 0, then useEffect immediately detects the initial fadeTrigger useEffect, setting it to 1.
   * Any changes beyond this will then trigger fades.
   */
  const [fadeTriggerCount, setFadeTriggerCount] = useState<number>(0);

  /**
   * When a fade trigger event happens, isFadingOut is set to true, which causes the fadeout animation class to apply.
   * When the fade completes, isFadingOut is set to false, which causes the fadein animation class to apply.
   * If first render, no fade class is applied.
   */
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  /**
   * childrenStates in an object with two entries, the previous state and the current state of the children.
   * This updates whenever children updates.
   * Using this for the final display creates a smooth transition when fading, avoiding timing issues that would be
   *   caused if displaying children directly when not fading out. (If using the children directly, the new state will
   *   briefly flash before the fade.)
   */
  const [childrenStates, setChildrenStates] = useState<ChildrenStates>({
    previousState: null,
    currentState: children,
  });

  /**
   * Updates the previous and current states of the child elements.
   */
  useEffect(() => {
    const previousState = childrenStates.currentState;
    setChildrenStates({ previousState: previousState, currentState: children });
  }, [children]);

  /**
   * Executes the fade effect when a fade trigger event happens.
   */
  useEffect(() => {
    setFadeTriggerCount(fadeTriggerCount + 1);

    setIsFadingOut(true);

    const timeout = setTimeout(() => {
      setIsFadingOut(false);
    }, 950);

    return () => clearTimeout(timeout);
  }, [fadeTriggers]);

  let fadeClass: string = "";
  const isBeyondFirstRender = fadeTriggerCount > 1;
  if (isBeyondFirstRender) {
    fadeClass = isFadingOut
      ? "fade-container-dynamic__fade-out"
      : "fade-container-dynamic__fade-in";
  }

  const childrenToRender = isFadingOut
    ? childrenStates.previousState
    : childrenStates.currentState;

  return (
    <span className={fadeClass} style={customStyles}>
      {childrenToRender}
    </span>
  );
};

export default FadeContainerDynamic;
