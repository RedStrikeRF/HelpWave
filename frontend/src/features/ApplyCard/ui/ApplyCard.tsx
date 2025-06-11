import { useBehavior } from "../model";
import { DefaultButton } from "@shared/ui";
import { ApplyCardProps } from "./types";
import './ApplyCard.scss';

export const ApplyCard = ({
    participantName,
    age,
    email,
    phone,
    participationScore,
    rating,
    eventsCount,
    status,
    onApprove,
    onRate,
    className,
    onClick,
}: ApplyCardProps) => {
    const {
        isActiveOrganizer,
        isParticipant,
        isContentCollapsed,
        ratingValue,
        isRatingMode,
        getStatusBadge,
        handleRateClick,
        submitRating,
        handleMarkClick
    } = useBehavior(status, onRate);

    return (
        <div onClick={onClick} className={className}>
            <div className="card-header">
                <h3>{participantName}</h3>
                {isActiveOrganizer && getStatusBadge()}
            </div>

            {!isContentCollapsed && (
                <div className="card-content">
                    <div className="details-column">
                        <div>Возраст: {age}</div>
                        <div>Почта: {email}</div>
                        <div>Телефон: {phone}</div>
                    </div>
                    <div className="details-column">
                        <div>Баллы за участие: {participationScore}</div>
                        <div>Рейтинг: {rating}</div>
                        <div>Мероприятий: {eventsCount}</div>
                    </div>
                </div>
            )}

            {isRatingMode && (
                <div className="rating-section">
                    <div className="rating-label">Оценка за участие</div>
                    <div className="hearts-container">
                        {[...Array(10)].map((_, index) => (
                            <span
                                key={index}
                                className="heart"
                                style={{
                                    color: index < ratingValue ? '#86B3D1' : '#385A64',
                                    cursor: 'pointer'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRateClick(index + 1);
                                }}
                            >
                                ♥
                            </span>
                        ))}
                    </div>
                    <DefaultButton
                        onClick={() => {
                            submitRating();
                        }}
                        className="submit-rating-btn"
                    >
                        Оценить
                    </DefaultButton>
                </div>
            )}

            <div className="card-actions">
                {isActiveOrganizer && status !== "approved" && (
                    <DefaultButton
                        onClick={() => {
                            onApprove?.();
                        }}
                        className="approve-btn"
                    >
                        Одобрить заявку
                    </DefaultButton>
                )}
                {isParticipant && !isRatingMode && (
                    <DefaultButton
                        onClick={() => {
                            handleMarkClick();
                        }}
                        className="mark-btn"
                    >
                        Отметить
                    </DefaultButton>
                )}
            </div>
        </div>
    );
};