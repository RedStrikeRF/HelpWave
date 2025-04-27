import { useNavigate } from 'react-router-dom';
import notification from '@shared/assets/notification.svg';

export const Notification = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/notification');
  };

  return (
    <img
      onClick={handleClick}
      className="header__notification-icon"
      src={notification}
    />
  );
};