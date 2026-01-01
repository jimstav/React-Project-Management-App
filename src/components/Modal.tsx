import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ModalHandle = {
  open: () => void;
};

interface ModalProps {
  children: React.ReactNode;
  buttonCaption: string;
}

const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children, buttonCaption }, ref) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current?.showModal();
        },
      };
    });

    return createPortal(
      <dialog ref={dialog}>
        {children}
        <form method="dialog">
          <button>{buttonCaption}</button>
        </form>
      </dialog>,
      document.getElementById('modal-root')!
    );
  }
);

export default Modal;
