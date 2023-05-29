import { FC } from "react";

import { Modal } from "components/Modal";

import { INotificationModalProps } from "./types";
import { Success, Error } from "./assets";
import {
  ModalContainer,
  MessageWrapper,
  Message,
  ButtonStyled,
} from "./styles";

const NotificationModal: FC<INotificationModalProps> = ({
  isOpen,
  isAnimation,
  isSucces,
  message,
  onClose,
}) => (
  <Modal isOpen={isOpen} isAnimation={isAnimation} onClose={onClose}>
    <ModalContainer isAnimation={isAnimation}>
      <MessageWrapper>
        {isSucces ? <Success /> : <Error />}
        <Message>{message}</Message>
      </MessageWrapper>
      <ButtonStyled onClick={onClose}>
        {isSucces ? "Let's fly!" : "Wash the sweater!"}
      </ButtonStyled>
    </ModalContainer>
  </Modal>
);

export default NotificationModal;
