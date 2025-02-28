import { useState } from "react";

/**
 * A hook that manages the state of a checkbox.
 */
export const useCheckbox = (initialState: boolean) => {
  // State of the checkbox
  const [isChecked, setIsChecked] = useState<boolean>(initialState);

  // Invert the current state of the checkbox
  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Resets to initial state
  const resetCheckbox = () => {
    setIsChecked(initialState);
  };

  return { isChecked, resetCheckbox, handleToggleCheckbox };
};
