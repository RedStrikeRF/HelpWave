export interface OrganizationRegistrationData {
    orgName: string;
    inn: string;
    region: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    password: string;
}

export interface OrganizationRegistrationResponse {
    message: string;
    token: string;
    user?: {
        orgName: string;
        lastName: string;
        firstName: string;
        middleName: string;
        email: string;
    };
}

export interface OrganizationProfile {
    id: string;
    orgName: string;
    inn: string;
    region: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    phone: string;
    orgInfo: string;
    activeApplications?: {
        id: string;
        eventName: string;
        status: string;
    }[];
    events: {
        id: string;
        name: string;
        date: string;
    }[];
}

export interface UpdateOrganizationData {
    orgName?: string;
    phone?: string;
    orgInfo?: string;
}

export interface UpdateOrganizationResponse {
    message: string;
}

export interface CreateEventData {
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    address: string;
    categories: string[];
    description?: string;
    image?: string;
}

export interface CreateEventResponse {
    message: string;
}

export interface UpdateEventData {
    name?: string;
    startDate?: string;
    categories?: string[];
    description?: string;
}

export interface UpdateEventResponse {
    message: string;
}

export interface DeleteEventResponse {
    message: string;
}

export interface CancelRegistrationResponse {
    message: string;
}

export interface ApplyEventData {
    message?: string;
}

export interface ApplyEventResponse {
    message: string;
}

export interface CancelApplicationResponse {
    message: string;
}