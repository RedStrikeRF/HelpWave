import { Button, ButtonProps } from '../Button';
import './BackButton.scss';

export const BackButton = ({
  onClick,
  className = '',
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`back-button ${className}`}
      type={type}
    >
      <svg 
        className="back-button__icon" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M15 18L9 12L15 6" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </Button>
  );
};