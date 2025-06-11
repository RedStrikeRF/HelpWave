import apiClient from '../client';
import { LoginData, LoginResponse, RegisterEventResponse } from './types';

export const login = async (data: LoginData) => {
    try {
        const response = await apiClient.post<LoginResponse>('/api/auth/login', data);
        return response.data;
    } catch (error) {
        throw new Error('Login failed');
    }
};

export const registerForEvent = async (eventId: string) => {
    try {
        const response = await apiClient.post<RegisterEventResponse>(`/api/events/${eventId}/register`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to register for event');
    }
};
