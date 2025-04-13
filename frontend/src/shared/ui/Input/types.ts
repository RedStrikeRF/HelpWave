import { ReactNode, ChangeEventHandler } from 'react';

export interface InputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  children?: ReactNode;
  placeholder?: string;
  type?: string;
  value?: string;
}