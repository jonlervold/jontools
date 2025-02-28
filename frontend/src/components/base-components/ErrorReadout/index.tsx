import Modal from "../Modal";
import { FC } from "react";

type Props = {
  failures: string[] | null;
  failuresDescription: string | null;
  errorMessage: string | null;
  onClose: () => void;
};

/**
 * A component that renders a modal for displaying errors.
 */
const ErrorReadout: FC<Props> = ({
  failures = null,
  failuresDescription = null,
  errorMessage = null,
  onClose,
}) => {
  return (
    <>
      {(failures || errorMessage) && (
        <Modal onClose={onClose}>
          {failures && (
            <div>
              {failuresDescription && <div>{failuresDescription}</div>}
              <ul>
                {failures.map((filename, index) => (
                  <li key={index}>{filename}</li>
                ))}
              </ul>
            </div>
          )}

          {errorMessage && <div>{errorMessage}</div>}
        </Modal>
      )}
    </>
  );
};

export default ErrorReadout;
