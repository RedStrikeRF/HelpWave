export interface Notification {
    id: string;
    text: string;
    date: string;
}

export interface Event {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    address: string;
    categories: string[];
    description?: string;
    imageUrl?: string;
    volunteersCount: number;
}

export interface EventSearchParams {
    query?: string;
    categories?: string[];
    startDate?: string;
    endDate?: string;
    location?: string;
    sortBy?: 'date_asc' | 'date_desc' | 'popularity' | 'newest';
    limit?: number;
    offset?: number;
}

export interface EventSearchResponse {
    events: Event[];
    total: number;
}

export interface ApplicationStatusResponse {
    id: string;
    status: string;
    eventId: string;
    appliedAt: string;
}