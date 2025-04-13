import { lazy } from 'react';
import { RouteConfig } from './types';

import { HomePage } from '@pages/public/HomePage';

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: (<HomePage />),
    private: false,
  },
  {
    path: '/login',
    element: <LoginPage />,
    private: false,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
    private: true,
    redirectTo: '/login',
  },
];