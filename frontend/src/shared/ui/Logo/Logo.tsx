import { Link } from 'react-router-dom';
import logo from '@shared/assets/logo.svg';
import { ReactNode } from 'react';

export interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`header__logo${className && ` ${className}`}`}>
      <img src={logo} alt='Logo' />
    </Link>
  );
};