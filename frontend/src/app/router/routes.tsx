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
import { EventPage} from '@pages/private/EventPage';

// Страницы волонтерства
import { EventSuccessPage as VolunteerEventSuccessPage } from '@pages/private/EventSuccessPage';
import { ActiveApplicationsPage as VolunteerActiveApplicationsPage } from '@pages/private/volunteer/ActiveApplicationsPage';

// Страницы организатора
import { EventCreatePage } from '@pages/private/organizer/EventCreatePage';

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
      {
        path: 'event/:id',
        element: <EventPage />,
      },
      // TODO: Прописать все страницы волонтеров ниже
      {
      path: 'volunteer',
      children: [
        {
          path: 'active-applications',
          element: <VolunteerActiveApplicationsPage />,
        },
        {
          path: 'event/:id',
          element: <EventPage />,
        }
        ]
        },
      // TODO: Прописать все страницы организаторов ниже
      {
        path: 'organizer',
        children: [
          {
            path: 'event/:id',
            element: <EventPage />,
          },
          {
            path: 'event/create',
            element: <EventCreatePage />,
          },
          // {
          //   path: 'event/:id/delete',
          //   element: <EventDeletePage />,
          // },
          // {
          //   path: 'event/:id/members',
          //   element: <EventMembersPage />,
          // },
          // {
          //   path: 'event/:id/edit',
          //   element: <EventEditPage />,
          // },
          // {
          //   path: 'event/:id/members/:member',
          //   element: <EventMemberPage />,
          // },
        ]
      },
    ],
  },
];