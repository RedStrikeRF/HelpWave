import { Header } from '@widgets/Header';
import { Outlet } from 'react-router-dom';

import './MainLayout.scss';

export const MainLayout = () => {
  return (
    <div className="page-layout">
      <Header />
      <main className='main__content'>
        <Outlet />
      </main>
    </div>
  );
};