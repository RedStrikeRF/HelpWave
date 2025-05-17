import { NotificationCardType } from "../model";

import './NotificationCard.scss';

export const NotificationCard: React.FC<NotificationCardType> = ({ text, date }) => {
  return (
    <div className="notification-card">
      <p className="notification-card__text">{text}</p>
      <p className="notification-card__date">{date}</p>
    </div>
  );
};