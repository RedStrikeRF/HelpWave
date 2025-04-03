import { ReactNode } from 'react';

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}