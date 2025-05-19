import apiClient from '../client';
import { Meeting } from './types';

export const MeetingsAPI = {
  list: (): Promise<{ data: Meeting[] }> =>
    apiClient.get('/meetings/'),

  create: (data: Omit<Meeting, 'id' | 'organizer'>): Promise<{ data: Meeting }> =>
    apiClient.post('/meetings/', data),

  update: (id: number, data: Partial<Omit<Meeting, 'id'>>): Promise<{ data: Meeting }> =>
    apiClient.put(`/meetings/${id}/`, data),
};
