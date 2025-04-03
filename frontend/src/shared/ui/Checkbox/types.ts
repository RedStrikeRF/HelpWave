import { ChangeEventHandler, ReactNode } from 'react';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  children?: ReactNode;
  id?: string;
  name?: string;
}