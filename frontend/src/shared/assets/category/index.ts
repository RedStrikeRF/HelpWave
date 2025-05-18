import CityIcon from './city.svg';
import CultureIcon from './culture.svg';
import EcologyIcon from './ecology.svg';
import EducationIcon from './education.svg';
import ElderlyIcon from './elderly.svg';
import HelpAnimalIcon from './help_animal.svg';
import HIAIcon from './HIA.svg';
import SearchIcon from './search.svg';
import SimplificationIcon from './Simplification.svg';
import SportIcon from './sport.svg';

export interface CategoryIcon {
  name: string;
  component: string;
}

export const categoryIcons: CategoryIcon[] = [
  { name: 'city', component: CityIcon },
  { name: 'culture', component: CultureIcon },
  { name: 'ecology', component: EcologyIcon },
  { name: 'education', component: EducationIcon },
  { name: 'elderly', component: ElderlyIcon },
  { name: 'help_animal', component: HelpAnimalIcon },
  { name: 'HIA', component: HIAIcon },
  { name: 'search', component: SearchIcon },
  { name: 'Simplification', component: SimplificationIcon },
  { name: 'sport', component: SportIcon },
];