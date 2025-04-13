import { FC, ReactNode } from 'react';

export interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}