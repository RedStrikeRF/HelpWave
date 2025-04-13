import { ReactNode } from 'react';

export interface PageRoute {
  path: string;
  element: ReactNode;
  private: boolean;
  layout?: ReactNode;
  redirectTo?: string;
}

export type PrivateRouteProps = {
  children: ReactNode;
  redirectTo?: string;
};