import apiClient from '../client';
import { Notification, Event, EventSearchParams, EventSearchResponse, ApplicationStatusResponse } from './types';

export const getNotifications = async (userId: string) => {
    try {
        const response = await apiClient.get<Notification[]>(`/api/users/${userId}/notifications`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch notifications');
    }
};

export const getEvent = async (eventId: string) => {
    try {
        const response = await apiClient.get<Event>(`/api/events/${eventId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch event');
    }
};

export const searchEvents = async (params: EventSearchParams) => {
    try {
        const response = await apiClient.get<EventSearchResponse>('/api/events/search', { params });
        return response.data;
    } catch (error) {
        throw new Error('Failed to search events');
    }
};

export const getApplicationStatus = async (eventId: string) => {
    try {
        const response = await apiClient.get<ApplicationStatusResponse>(`/api/events/${eventId}/my-application`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch application status');
    }
};