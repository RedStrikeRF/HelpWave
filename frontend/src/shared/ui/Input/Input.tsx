import { InputProps } from "./types";

export const Input = ({
  onChange,
  className,
  placeholder,
  value,
  type = 'text',
  disabled = false,
  name,
  readOnly = false
}: InputProps) => {
  return (
    <input
      type={type}
      onChange={onChange}
      name={name}
      className={className}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      autoComplete="off"
    />
  );
};