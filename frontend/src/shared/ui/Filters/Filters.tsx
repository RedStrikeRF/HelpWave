import { FiltersProps } from './types';
import { Checkbox } from '@shared/ui';

export const Filters = ({
  options,
  onChange,
  className,
  title,
  children
}: FiltersProps) => {
  return (
    <div className={className}>
      {title && <h3>{title}</h3>}

      {options.map((option) => (
        <Checkbox
          key={option.value}
          checked={option.checked}
          onChange={onChange}
          name={option.value}
        >
          {option.label}
        </Checkbox>
      ))}

      {children}
    </div>
  );
};