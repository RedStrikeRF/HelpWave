import { RouteObject } from 'react-router-dom';

import { MainLayout } from '@shared/ui/layout/MainLayout';
import { PrivateRoute } from './PrivateRoute';

import { ProfilePage } from '@pages/public/ProfilePage';
import { EventsPage } from '@pages/public/EventsPage';

// Общие страницы
import { NotificationPage } from '@pages/private/NotificationPage';
import { LoginPage } from '@pages/public/LoginPage';
import { HomePage } from '@pages/public/HomePage';
import { RegistrationPage } from '@pages/public/RegistrationPage';

// Страницы волонтерства
import { EventPage as VolunteerEventPage } from '@pages/private/volunteer/EventPage';
import { EventSuccessPage as VolunteerEventSuccessPage } from '@pages/private/EventSuccessPage';
import { ActiveApplicationsPage as VolunteerActiveApplicationsPage } from '@pages/private/volunteer/ActiveApplicationsPage';

// Страницы организатора


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
      // Тут общие страницы
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/notification',
        element: <NotificationPage />,
      },
      {
        path: 'event/success',
        element: <VolunteerEventSuccessPage />,
      },
      // TODO: Прописать все страницы волонтеров ниже
      {
      path: 'volunteer',
      children: [
        {
        path: 'event/:id',
        element: <VolunteerEventPage />,
        },
        
        {
          path: 'active-applications',
          element: <VolunteerActiveApplicationsPage />,
        }
        ]
        },
      // TODO: Прописать все страницы организаторов ниже
      {
        path: 'organizer',
        children: [
          {
            path: 'dashboard',
            element: <h1>тостер</h1>
          }
        ]
      },
    ],
  },
];