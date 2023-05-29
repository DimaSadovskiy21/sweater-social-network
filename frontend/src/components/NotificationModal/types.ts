export interface INotificationModalProps {
  isOpen: boolean;
  isAnimation: boolean;
  isSucces: boolean;
  message: string;
  onClose: () => void;
}

export interface IModalContainerProps extends Pick<INotificationModalProps, 'isAnimation'> {}
