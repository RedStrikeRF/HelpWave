import apiClient from '../client';
import {
    OrganizationRegistrationData,
    OrganizationRegistrationResponse,
    OrganizationProfile,
    UpdateOrganizationData,
    UpdateOrganizationResponse,
    CreateEventData,
    CreateEventResponse,
    UpdateEventData,
    UpdateEventResponse,
    DeleteEventResponse,
    CancelRegistrationResponse,
    ApplyEventData,
    ApplyEventResponse,
    CancelApplicationResponse,
} from './types';

export const registerOrganization = async (data: OrganizationRegistrationData) => {
    try {
        const response = await apiClient.post<OrganizationRegistrationResponse>('/api/auth/register/organization', data);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('access_token', token);
        }
        return response.data;
    } catch (error) {
        throw new Error('Organization registration failed');
    }
};

export const getOrganizationProfile = async () => {
    try {
        const response = await apiClient.get<OrganizationProfile>('/api/organizations/me');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch organization profile');
    }
};

export const updateOrganizationProfile = async (data: UpdateOrganizationData) => {
    try {
        const response = await apiClient.patch<UpdateOrganizationResponse>('/api/organizations/me', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update organization profile');
    }
};

export const createEvent = async (data: CreateEventData) => {
    try {
        const response = await apiClient.post<CreateEventResponse>('/api/organizations/me/events', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create event');
    }
};

export const updateEvent = async (eventId: string, data: UpdateEventData) => {
    try {
        const response = await apiClient.patch<UpdateEventResponse>(`/api/organizations/me/events/${eventId}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update event');
    }
};

export const deleteEvent = async (eventId: string) => {
    try {
        const response = await apiClient.delete<DeleteEventResponse>(`/api/organizations/me/events/${eventId}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete event');
    }
};

export const cancelEventRegistration = async (eventId: string) => {
    try {
        const response = await apiClient.delete<CancelRegistrationResponse>(`/api/events/${eventId}/register`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to cancel event registration');
    }
};

export const applyForEvent = async (eventId: string, data: ApplyEventData) => {
    try {
        const response = await apiClient.post<ApplyEventResponse>(`/api/events/${eventId}/apply`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to apply for event');
    }
};

export const cancelEventApplication = async (eventId: string) => {
    try {
        const response = await apiClient.delete<CancelApplicationResponse>(`/api/events/${eventId}/apply`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to cancel event application');
    }
};