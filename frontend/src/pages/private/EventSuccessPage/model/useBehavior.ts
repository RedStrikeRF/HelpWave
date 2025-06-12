import { useNavigate, useLocation } from 'react-router-dom';

export const useBehavior = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname;
  const isOrganizer: boolean = pathname.includes('/organizer/');

  const handleGoToApplications = () => {
    navigate(isOrganizer ? '/organizer/active-application' : '/volunteer/active-application');
  };

  const handleGoToSearch = () => {
    navigate(isOrganizer ? '/organizer/events' : '/volunteer/events/search');
  };

  return {
    isOrganizer,
    handleGoToApplications,
    handleGoToSearch
  };
};
