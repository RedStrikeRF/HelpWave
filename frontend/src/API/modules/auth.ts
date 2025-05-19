import apiClient from '../client';
import { VolunteerProfile, OrganizerProfile, TokenResponse } from './types';

type LoginData = {
  username: string;
  password: string;
};

export const AuthAPI = {
  login: (data: LoginData): Promise<{ data: TokenResponse }> =>
    apiClient.post('/token/', data),

  refreshToken: (refresh: string): Promise<{ data: { access: string } }> =>
    apiClient.post('/token/refresh/', { refresh }),

  verifyToken: (token: string): Promise<void> =>
    apiClient.post('/token/verify/', { token }),
};
