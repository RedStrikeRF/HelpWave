import { useNavigate } from 'react-router-dom';

export const useBehavior = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/volunteer/registration');
  };

  return {
    handleBackClick,
    handleRegisterClick
  };
};