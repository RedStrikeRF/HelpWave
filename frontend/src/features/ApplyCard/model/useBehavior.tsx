import { useState } from 'react';

export const useBehavior = (status?: string, onRate?: (rating: number) => void) => {
    const isActiveOrganizer = location.pathname.includes('/active-organizer');
    const isEventOrganizer = location.pathname.includes('/event-organizer');
    const isVolunteer = location.pathname.includes('/volunteer');
    const isParticipant = location.pathname.includes('/participant');

    const [isContentCollapsed, setIsContentCollapsed] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [isRatingMode, setIsRatingMode] = useState(false);

    const getStatusBadge = () => {
        let statusClass = "status-badge";
        switch (status) {
            case "rejected":
                statusClass += " rejected";
                break;
            case "approved":
                statusClass += " approved";
                break;
            default:
                statusClass += " pending";
        }

        return (
            <div className= { statusClass } >
                { status === "rejected"
                ? "Заявка отклонена"
                : status === "approved"
                    ? "Заявка одобрена"
                    : "Заявка на рассмотрении"
    }
    </div>
        );
    };

const handleRateClick = (value: number) => {
    setRatingValue(value);
};

const submitRating = () => {
    onRate?.(ratingValue);
    setIsRatingMode(false);
    setIsContentCollapsed(false);
};

const handleMarkClick = () => {
    setIsContentCollapsed(true);
    setIsRatingMode(true);
};

return {
    isActiveOrganizer,
    isEventOrganizer,
    isVolunteer,
    isParticipant,
    isContentCollapsed,
    ratingValue,
    isRatingMode,
    getStatusBadge,
    handleRateClick,
    submitRating,
    handleMarkClick
};
};