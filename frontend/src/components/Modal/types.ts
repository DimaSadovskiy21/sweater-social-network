import { ReactNode } from 'react';

export interface IModalProps {
  isOpen: boolean;
  isAnimation: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface IOverlineProps extends Pick<IModalProps, 'isAnimation'>{};
