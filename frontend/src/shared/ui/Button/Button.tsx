import { ButtonProps } from './types';

export const Button = ({ onClick, className, children, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </button>
  );
};