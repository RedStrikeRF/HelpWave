import { NotificationCard } from './NotificationCard';
import { useBehavior } from '../model';

import './NotificationPage.scss';

export const NotificationPage = () => {
  const { notifications } = useBehavior();

  return (
    <div className='notification-page'>
      <h2 className='notification-page__title'>Уведомления</h2>
      <div className="notification-page__list">
        {notifications.map((notification, index) => (
          <NotificationCard
            key={index}
            text={notification.text}
            date={notification.date}
          />
        ))}
      </div>
    </div>
  )
}