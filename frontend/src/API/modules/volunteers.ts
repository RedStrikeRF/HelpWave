import apiClient from '../client';
import { Volunteer } from './types';

export const VolunteersAPI = {
  list: (): Promise<{ data: Volunteer[] }> =>
    apiClient.get('/volunteers/'),

  register: (data: Omit<Volunteer, 'id'>): Promise<{ data: Volunteer }> =>
    apiClient.post('/volunteers/', data),

  getById: (id: number): Promise<{ data: Volunteer }> =>
    apiClient.get(`/volunteers/${id}/`),
};
