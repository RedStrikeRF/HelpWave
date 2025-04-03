import { ReactNode, ChangeEventHandler } from 'react';

interface FilterOption {
  value: string;
  label: string;
  checked?: boolean;
}

export interface FiltersProps {
  options: FilterOption[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  title?: string;
  children?: ReactNode;
}
