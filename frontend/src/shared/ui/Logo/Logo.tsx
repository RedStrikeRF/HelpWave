import { Link } from 'react-router-dom';
import logo from '@shared/assets/logo.svg';

export const Logo = () => {
  return (
    <Link to="/" className="header__logo">
      <img src={logo} alt='Logo' />
    </Link>
  );
};