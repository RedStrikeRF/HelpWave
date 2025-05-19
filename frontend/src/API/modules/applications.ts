import apiClient from '../client';
import {
  VolunteerApplication,
  VolunteerApplicationCreate,
  VolunteerApplicationUpdate,
} from './types';

export const ApplicationsAPI = {
  list: (): Promise<{ data: VolunteerApplication[] }> =>
    apiClient.get('/applications/'),

  apply: (data: VolunteerApplicationCreate): Promise<{ data: VolunteerApplication }> =>
    apiClient.post('/applications/', data),

  updateStatus: (id: number, data: VolunteerApplicationUpdate): Promise<{ data: VolunteerApplication }> =>
    apiClient.patch(`/applications/${id}/`, data),
};
