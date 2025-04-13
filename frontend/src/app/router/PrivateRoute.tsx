import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { PrivateRouteProps } from './types';

// TODO: сделать отображение нормальное логики проверки реги пользователя
const isAuthenticated = () => {
  return Boolean(localStorage.getItem('token'));
};

export const PrivateRoute = ({ children, redirectTo = '/login' }: PrivateRouteProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
