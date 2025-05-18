import { useBehavior } from '../model';
import ReactMarkdown from 'react-markdown';

import eventDefaultImage from '@shared/assets/eventDefault.svg'
import dateIcon from '@shared/assets/date.svg';
import timeIcon from '@shared/assets/time.svg';
import locationIcon from '@shared/assets/location.svg';
import categoryIcon from '@shared/assets/category.svg';

import './EventPage.scss';
import { DefaultButton, DeleteButton, EditButton, TransparentButton } from '@shared/ui';

export const EventPage = () => {
  const { 
    event,
    redirect,
    isOrganizer,
    redirectDelete,
    redirectEdit,
    redirectMembers
   } = useBehavior();

  return (
    <div className='event-page__wrapper'>
      <div className="event-page">
        <h1 className="event-page__title">{event.title}</h1>

        {isOrganizer &&
          <div className="event-page__organizers">
            <DeleteButton className="event-page__button__organizer" onClick={redirectDelete}>Удалить</DeleteButton>
            <EditButton className="event-page__button__organizer" onClick={redirectEdit}>Изменить</EditButton>
            <TransparentButton className="event-page__button__organizer" onClick={redirectMembers}>Участники</TransparentButton>
          </div>
        }

        <div className="event-page__info">
          <img src={event.imageUrl || eventDefaultImage} className="event-page__img" alt="event page img"/>
          <div className="event-page__right-side">
            <div className="event-page__info-item">
              <img src={dateIcon} alt="date" />
              <span>{event.date}</span> 
            </div>
            <div className="event-page__info-item">
              <img src={timeIcon} alt="time" />
              <span>{event.time}</span>
            </div>
            <div className="event-page__info-item">
              <img src={locationIcon} alt="location" />
              <span>{event.location}</span>
            </div>
            <div className="event-page__info-item">
              <img src={categoryIcon} alt="category" />
              <span>{Array.isArray(event.category)
                  ? event.category.join(', ')
                  : event.category}</span>
            </div>
          </div>
        </div>

        <div className="event-page__content markdown-body">
          <h2 className="event-page__subtitle">Описание</h2>
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </div>

        <div className="event-page__organization">
          <h3>{event.organization}</h3>
        </div>
      </div>
      <DefaultButton onClick={redirect} className='event-page__button' type='button'>{isOrganizer ? `Назад к активным заявкам` : `Подать заявку`}</DefaultButton>
    </div>
    
  );
};
