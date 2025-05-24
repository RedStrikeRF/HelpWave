import { useNavigate } from 'react-router-dom';

export const useBehavior = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/organizer/registration');
  };

  return {
    handleBackClick,
    handleRegisterClick
  };
};