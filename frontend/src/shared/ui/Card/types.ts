import { ReactNode } from 'react';

export interface CardProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
}
