import { Button, ButtonProps } from '../Button';

import './DefaultButton.scss';

export const DefaultButton = ({
  onClick,
  className,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`default-button ${className}`}
      type={type}
    >
      {children}
    </Button>
  );
};
