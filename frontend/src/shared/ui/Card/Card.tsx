import { CardProps } from "./types";

export const Card = ({ onClick, className, children }: CardProps) => {
  return (
    <div 
      onClick={onClick} 
      className={className}
    >
      {children}
    </div>
  );
};