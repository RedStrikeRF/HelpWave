import { Outlet } from 'react-router-dom';
import { Logo } from '@shared/ui';

import './AuthLayout.scss';

export const AuthLayout = () => {
  return (
    <div className="auth-page-layout">
      <Logo className="auth-page-layout__logo"/>
      <main className='auth-main__content'>
        <Outlet />
      </main>
    </div>
  );
}