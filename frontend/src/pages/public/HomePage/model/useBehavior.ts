import { useNavigate } from "react-router-dom"

export const useBehavior = () => {
  const navigate = useNavigate();

  const navigateToVolunteerInfo = (() => {
    navigate('/volunteer/info')
  })

  const navigateToOrganizerInfo = (() => {
    navigate('/organizer/info')
  })

  return {
    navigateToVolunteerInfo,
    navigateToOrganizerInfo
  }
}