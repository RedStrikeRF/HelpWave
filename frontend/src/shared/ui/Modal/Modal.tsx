import { ModalProps } from "./types";

export const Modal = ({ onClose, className, children }: ModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={className}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};