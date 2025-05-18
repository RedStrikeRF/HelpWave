import { Button, ButtonProps } from '../Button';

import './DeleteButton.scss';

export const DeleteButton = ({
  onClick,
  className,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`delete-button ${className}`}
      type={type}
    >
      {children}
    </Button>
  );
};
