import { CheckboxProps } from "./types";

export const Checkbox = ({
  checked,
  onChange,
  className,
  children,
  id,
  name
}: CheckboxProps) => {
  return (
    <label className={className}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        name={name}
      />
      {children}
    </label>
  );
};