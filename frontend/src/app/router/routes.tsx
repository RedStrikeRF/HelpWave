import { RouteObject } from 'react-router-dom';

import { MainLayout, AuthLayout } from '@shared/ui';
import { PrivateRoute } from './PrivateRoute';

import { EventsPage } from '@pages/public/EventsPage';

// Общие страницы
import { NotificationPage } from '@pages/private/NotificationPage';
import { LoginPage } from '@pages/public/AuthPages/LoginPage';
import { HomePage } from '@pages/public/HomePage';
import { EventPage } from '@pages/private/EventPage';
import { VolunteerRegPage, OrganizerRegPage } from '@pages/public/AuthPages';

// Страницы волонтерства
import { EventSuccessPage } from '@pages/private/EventSuccessPage';
import { ActiveApplicationsPage as VolunteerActiveApplicationsPage } from '@pages/private/volunteer/ActiveApplicationsPage';
import { VolunteerInfoPage } from '@pages/public/InfoPage/Volunteer';

// Страницы организатора
import { OrganizerInfoPage } from '@pages/public/InfoPage/Organizer';
import { EventCreatePage } from '@pages/private/organizer/EventCreatePage';
import { VolunteerProfilePage } from '@pages/private/volunteer/ProfilePage';
import { VolunteerProfileEditPage } from '@pages/private/volunteer/ProfileEditPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'notification', element: <NotificationPage /> },
      {
        path: 'volunteer',
        children: [
          // Страница с информацией о возможностях волонтеров у нас на платформе
          { path: 'info', element: <VolunteerInfoPage /> },

          // Страница об успешно созданной заявке на мероприятие
          { path: 'events/success', element: <EventSuccessPage /> },

          // Страница профиля волонтера
          // TODO
          { path: 'profile', element: <VolunteerProfilePage /> },

          // Страница редактирования информации профиля волонтера
          // TODO
          { path: 'profile/edit', element: <VolunteerProfileEditPage /> },
        ],
      },
      {
        path: 'organizer',
        children: [
          // Страница с информацией о возможностях организаторов у нас на платформе
          { path: 'info', element: <OrganizerInfoPage /> },

          // Страница об успешно созданной мероприятии
          { path: 'events/success', element: <EventSuccessPage /> },

          
        ],
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'volunteer/registration', element: <VolunteerRegPage /> },
      { path: 'organizer/registration', element: <OrganizerRegPage /> },
    ],
  },
];
