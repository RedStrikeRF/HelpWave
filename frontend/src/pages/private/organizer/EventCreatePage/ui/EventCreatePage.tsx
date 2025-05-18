import { EventForm } from "@widgets/EventForm"

export const EventCreatePage = () => {
  return (
    <div className="event-create-page">
      <h2 className="event-create-page__title">Создать мероприятие</h2>
      <EventForm />
    </div>
  )
}