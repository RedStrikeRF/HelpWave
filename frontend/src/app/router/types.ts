import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';

export type RouteConfig = {
  path: string;
  element: ReactNode;
  private?: boolean;
  redirectTo?: string;
} & RouteObject;