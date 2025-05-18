import { ReactNode } from 'react';

export interface CardProps {
  title: string;
  dateRange: string;
  time: string;
  location: string;
  category: string;
  imageUrl: string;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
  status?: string;
}
