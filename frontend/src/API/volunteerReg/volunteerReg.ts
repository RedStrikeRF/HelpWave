import apiClient from '../client';
import {
    VolunteerRegistrationData,
    VolunteerRegistrationResponse,
    VolunteerProfile,
    UpdateVolunteerData,
    UpdateVolunteerResponse,
    EventVolunteersResponse,
    RateVolunteerData,
    RateVolunteerResponse,
    ApproveVolunteerData,
    ApproveVolunteerResponse,
    RejectVolunteerData,
    RejectVolunteerResponse,
    ResetVolunteerResponse,
} from './types';

export const registerVolunteer = async (data: VolunteerRegistrationData) => {
    try {
        const response = await apiClient.post<VolunteerRegistrationResponse>('/api/auth/register/volunteer', data);
        const { token } = response.data;
        if (token) {
            localStorage.setItem('access_token', token);
        }
        return response.data;
    } catch (error) {
        throw new Error('Volunteer registration failed');
    }
};
export const getVolunteerProfile = async () => {
    try {
        const response = await apiClient.get<VolunteerProfile>('/api/volunteers/me');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch volunteer profile');
    }
};

export const updateVolunteerProfile = async (data: UpdateVolunteerData) => {
    try {
        const response = await apiClient.patch<UpdateVolunteerResponse>('/api/volunteers/me', data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update volunteer profile');
    }
};

export const getEventVolunteers = async (eventId: string) => {
    try {
        const response = await apiClient.get<EventVolunteersResponse>(`/api/events/${eventId}/volunteers`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch event volunteers');
    }
};

export const rateVolunteer = async (eventId: string, volunteerId: string, data: RateVolunteerData) => {
    try {
        const response = await apiClient.post<RateVolunteerResponse>(`/api/events/${eventId}/volunteers/${volunteerId}/rate`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to rate volunteer');
    }
};

export const approveVolunteer = async (eventId: string, volunteerId: string, data: ApproveVolunteerData) => {
    try {
        const response = await apiClient.patch<ApproveVolunteerResponse>(`/api/events/${eventId}/volunteers/${volunteerId}/approve`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to approve volunteer');
    }
};

export const rejectVolunteer = async (eventId: string, volunteerId: string, data: RejectVolunteerData) => {
    try {
        const response = await apiClient.patch<RejectVolunteerResponse>(`/api/events/${eventId}/volunteers/${volunteerId}/reject`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to reject volunteer');
    }
};

export const resetVolunteerApplication = async (eventId: string, volunteerId: string) => {
    try {
        const response = await apiClient.patch<ResetVolunteerResponse>(`/api/events/${eventId}/volunteers/${volunteerId}/reset`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to reset volunteer application');
    }
};