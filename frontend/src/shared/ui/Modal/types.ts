import { ReactNode } from 'react';

export interface ModalProps {
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}