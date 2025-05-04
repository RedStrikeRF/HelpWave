import { RouteObject } from 'react-router-dom';

import { MainLayout } from '@shared/ui/layout/MainLayout';

import { LoginPage } from '@pages/public/LoginPage';
import { HomePage } from '@pages/public/HomePage';
import { RegistrationPage } from '@pages/public/RegistrationPage';
import { ProfilePage } from '@pages/public/ProfilePage'; // Импортируем компонент страницы профиля

import { PrivateRoute } from './PrivateRoute';
import { EventsPage } from '@pages/public/EventsPage';

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
      {
        path: 'profile',
        element: (
          <ProfilePage />
        ),
      },
      {
        path: 'profile/:userId',
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: 'events',
        element: (
          <EventsPage />
        ),
      },
    ],
  },
];