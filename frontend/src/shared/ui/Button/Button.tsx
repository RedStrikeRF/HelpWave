import { ButtonProps } from './types';

export const Button = ({ onClick, className, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};