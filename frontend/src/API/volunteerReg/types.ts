export interface VolunteerRegistrationData {
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    email: string;
    password: string;
}

export interface VolunteerRegistrationResponse {
    message: string;
    token: string;
    user?: {
        lastName: string;
        firstName: string;
        middleName: string;
        birthDate: string;
        email: string;
    };
}

export interface VolunteerProfile {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    birthDate: string;
    email: string;
    phone: string;
    stats: {
        points: number;
        rating: number;
        eventsCount: number;
        hours: number;
    };
    skills: string[];
    interests: string[];
    certificates: {
        id: string;
        name: string;
        url: string;
    }[];
}

export interface UpdateVolunteerData {
    lastName?: string;
    firstName?: string;
    phone?: string;
    skills?: string[];
    interests?: string[];
}

export interface UpdateVolunteerResponse {
    message: string;
}

export interface EventVolunteersResponse {
    volunteers: {
        id: string;
        birthDate: string;
        lastName: string;
        firstName: string;
        middleName: string;
        email: string;
        phone: string;
        stats: {
            points: number;
            rating: number;
            eventsCount: number;
        };
    }[];
    total: number;
}

export interface RateVolunteerData {
    rating: number;
}

export interface RateVolunteerResponse {
    message: string;
}

export interface ApproveVolunteerData {
    status: 'approved' | 'rejected';
}

export interface ApproveVolunteerResponse {
    message: string;
}

export interface RejectVolunteerData {
    message: string;
}

export interface RejectVolunteerResponse {
    message: string;
}

export interface ResetVolunteerResponse {
    message: string;
}