import "./LoadingIndicator.css";
import Modal from "../Modal";
import { FC } from "react";

type Props = {
  isLoading: boolean;
};

/**
 * A component that renders a modal with a loading indicator.
 */
const LoadingIndicator: FC<Props> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <Modal>
          <div className="loading-indicator__container">
            <div className="loading-indicator__spinner"></div>
            <div>processing...</div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default LoadingIndicator;
