import { Button, ButtonProps } from '../Button';

import './EditButton.scss';

export const EditButton = ({
  onClick,
  className,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`edit-button ${className}`}
      type={type}
    >
      {children}
    </Button>
  );
};
