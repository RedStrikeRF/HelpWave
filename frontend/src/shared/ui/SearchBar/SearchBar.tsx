import { Input } from '@shared/ui';
import { SearchBarProps } from './types';
import magnifying_glass from '@shared/assets/MagnifyingGlass.svg';

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="header__searchbar">
      <div className="header__searchbar-icon">
        <img src={magnifying_glass} alt='Иконка поиска мероприятия' />
      </div>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Поиск событий..."
        className="header__searchbar-input"
      />
    </div>
  );
};
