import { InputProps } from "./types";

export const Input = ({
  onChange,
  className,
  children,
  placeholder,
  type = 'text'
}: InputProps) => {
  return (
    <div>
      {children && <label>{children}</label>}
      <input
        type={type}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </div>
  );
};