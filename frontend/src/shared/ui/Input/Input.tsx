import { InputProps } from "./types";

export const Input = ({
  onChange,
  className,
  children,
  placeholder,
  value,
  type = 'text',
  disabled
}: InputProps) => {
  return (
    <div>
      {children && <label>{children}</label>}
      <input
        type={type}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};