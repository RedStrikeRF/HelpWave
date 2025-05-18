import { Button, ButtonProps } from '../Button';

import './TransparentButton.scss';

export const TransparentButton = ({
  onClick,
  className,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`transparent-button ${className}`}
      type={type}
    >
      {children}
    </Button>
  );
};
