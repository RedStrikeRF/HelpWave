import requestIllustration from '@shared/assets/f.svg';
import { useBehavior } from '../model';
import './ApplyPage.scss';
import { ApplyCard } from '@features/ApplyCard';

export const ApplyPage = () => {
    const {
        requestData,
        handleApprove,
        handleRate
    } = useBehavior();

    return (
        <div className="apply-page">
            <div className="illustration-container">
                <img
                    src={requestIllustration}
                    alt="Иллюстрация заявки"
                    className="apply-illustration"
                />
            </div>

            <div className="card-container">
                <ApplyCard
                    participantName={requestData.participantName}
                    age={requestData.age}
                    email={requestData.email}
                    phone={requestData.phone}
                    participationScore={requestData.participationScore}
                    rating={requestData.rating}
                    eventsCount={requestData.eventsCount}
                    status={requestData.status}
                    onApprove={handleApprove}
                    onRate={handleRate}
                    className="request-card"
                />
            </div>
        </div>
    );
};