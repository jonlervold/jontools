import { useState } from "react";

/**
 * A hook that manages the state of the error readout.
 */
export const useErrorReadout = () => {
  // Error message state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Batch file failures state
  const [failures, setFailures] = useState<string[] | null>(null);

  // Description of the list of failures
  const [failuresDescription, setFailuresDescription] = useState<string | null>(
    null
  );

  // Clears all error message states
  const clearErrors = (): void => {
    setErrorMessage(null);
    setFailures(null);
    setFailuresDescription(null);
  };

  // Handles closing the error modal
  const handleCloseErrorModalClick = (): void => {
    clearErrors();
  };

  return {
    failures,
    setFailures,
    errorMessage,
    setErrorMessage,
    failuresDescription,
    setFailuresDescription,
    handleCloseErrorModalClick,
  };
};
