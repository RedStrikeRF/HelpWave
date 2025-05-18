export const useBehavior = () => {
    const isActiveOrganizer = location.pathname.includes('/active-organizer');
    const isEventOrganizer = location.pathname.includes('/event-organizer');
    const isVolunteer = location.pathname.includes('/volunteer');

    return {
        isActiveOrganizer,
        isEventOrganizer,
        isVolunteer
    }
}