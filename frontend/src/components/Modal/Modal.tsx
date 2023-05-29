import { FC } from "react";
import { createPortal } from "react-dom";

import { Overline } from "./styles";
import { IModalProps } from "./types";


const Modal: FC<IModalProps> = ({ isOpen, isAnimation , onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <>
      <Overline isAnimation={isAnimation} onClick={onClose} />
      {children}
    </>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
