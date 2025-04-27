import { Header } from '@widgets/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className='main__content'>
        <Outlet />
      </main>
    </div>
  );
};