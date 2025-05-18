import { EventForm } from "@widgets/EventForm";

import './EventCreatePage.scss';

export const EventCreatePage = () => {
  return (
    <div className="event-create-page">
      <h2 className="event-create-page__title">Создать мероприятие</h2>
      <EventForm />
    </div>
  )
}