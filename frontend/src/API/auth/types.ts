export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
    userType: 'volunteer' | 'organization';
    user?: {
        email: string;
        lastName?: string;
        firstName?: string;
        middleName?: string;
        orgName?: string;
    };
}


export interface RegisterEventResponse {
    message: string;
}