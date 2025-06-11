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
import { EventSuccessPage as VolunteerEventSuccessPage } from '@pages/private/EventSuccessPage';
import { ActiveApplicationsPage as VolunteerActiveApplicationsPage } from '@pages/private/volunteer/ActiveApplicationsPage';
import { VolunteerInfoPage } from '@pages/public/InfoPage/Volunteer';

// Страницы организатора
import { OrganizerInfoPage } from '@pages/public/InfoPage/Organizer';
import { EventCreatePage } from '@pages/private/organizer/EventCreatePage';
<<<<<<< Updated upstream
import { ApplyPage } from '@pages/private/ApplyPage/ui';
=======
>>>>>>> Stashed changes

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'notification', element: <NotificationPage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'apply', element: <ApplyPage /> },

      // Страницы волонтёра
      {
        
        path: 'volunteer',
        children: [
          // Страница с информацией о возможностях волонтеров у нас на платформе
          { path: 'info', element: <VolunteerInfoPage /> },
          // Страница отображения Информации о событии
          { path: 'event/:id', element: <EventPage /> },
          // Страница об успешно созданной заявке на мероприятие
          { path: 'event/success', element: <VolunteerEventSuccessPage /> },
          // TODO расставить нужные страницы
          // Основная страница профиля
          // { path: 'profile', element: <EventCreatePage /> },
          // Страница редактирования данных профиля
          // { path: 'profile/edit', element: <EventCreatePage /> },
          // Страница с активными заявками и их статусами
          { path: 'active-applications', element: <VolunteerActiveApplicationsPage /> },
        ],
      },
<<<<<<< Updated upstream

      // Страницы организатора
=======
      {
        path: '/notification',
        element: <NotificationPage />,
      },
      {
        path: '/events',
        element: <EventsPage />,
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
>>>>>>> Stashed changes
      {
        path: 'organizer',
        children: [
          // Страница с информацией о возможностях организаторов у нас на платформе
          { path: 'info', element: <OrganizerInfoPage /> },

          // Страница отображения Информации о событии
          { path: 'event/:id', element: <EventPage /> },
          // Страница создания мероприятия
          { path: 'event/create', element: <EventCreatePage /> },
          // Страница об успешно созданной мероприятии
          { path: 'event/success', element: <VolunteerEventSuccessPage /> },
          // TODO расставить нужные страницы
          // Основная страница профиля
          // { path: 'profile', element: <EventCreatePage /> },
          // Страница редактирования данных профиля
          // { path: 'profile/edit', element: <EventCreatePage /> },
        ],
      },
    ],
  },

  // Layout для авторизации/регистрации
  // TODO
  // 1: Проверить API на работоспособность
  // 2: Добавить API для регистрации волонтера и организатора
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: '/volunteer/registration', element: <VolunteerRegPage /> },
      { path: '/organizer/registration', element: <OrganizerRegPage /> },
    ],
  },
];
