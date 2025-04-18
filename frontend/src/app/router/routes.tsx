import { RouteObject } from 'react-router-dom';

import { MainLayout } from '@shared/ui/layout/MainLayout';

import { LoginPage } from '@pages/public/LoginPage';
import { HomePage } from '@pages/public/HomePage';
import { RegistrationPage } from '@pages/public/RegistrationPage';

import { PrivateRoute } from './PrivateRoute';

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        ),
      },
    ],
  },
];