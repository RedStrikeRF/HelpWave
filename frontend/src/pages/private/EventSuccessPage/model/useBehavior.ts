import { useNavigate, useLocation } from "react-router-dom";

export const useBehavior = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  const isOrganizer: boolean = from?.includes('/organizer');

  const handleGoToApplications = () => {
    navigate(isOrganizer ? '/organizer/active-applications' : '/volunteer/active-applications');
  };

  const handleGoToSearch = () => {
    navigate(isOrganizer ? '/organizer/searchEvent' : '/volunteer/searchEvent');
  };

  return {
    isOrganizer,
    handleGoToApplications,
    handleGoToSearch
  };
};
