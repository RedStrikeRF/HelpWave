import { ReactNode } from "react";

export interface ApplyCardProps {
    participantName: string;
    age: number;
    email: string;
    phone: string;
    participationScore: number;
    rating: number;
    eventsCount: number;
    status?: string;
    onApprove?: () => void;
    onRate?: (rating: number) => void;
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
}