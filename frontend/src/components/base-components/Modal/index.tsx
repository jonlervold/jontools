import Button from "../Button";
import { FC } from "react";
import "./Modal.css";

type Props = {
  children: React.ReactNode;
  onClose?: () => void;
};

/**
 * A component used by other components to display content in a modal.
 */
const Modal: FC<Props> = ({ children, onClose = null }) => {
  /**
   * If an onClose function is provided, the modal can be closed manually,
   *   so the Close button will be shown.
   */
  const manualCloseAllowed = onClose !== null;

  /**
   * If the user clicks outside the modal, the modal will close if manualCloseAllowed is true.
   * Otherwise, the modal will not close.
   */
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const userClickedOutsideModal = event.target === event.currentTarget;
    if (manualCloseAllowed && userClickedOutsideModal) {
      onClose();
    }
  };

  return (
    <div className="modal__container" onClick={handleContainerClick}>
      <div className="modal__card">
        <div className="modal__main-content">{children}</div>

        {manualCloseAllowed && (
          <div className="modal__close-button-container">
            <Button label="Close" onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
