import { Button } from "@shared/ui";
import computer from '@shared/assets/k.svg';
import files from '@shared/assets/q.svg';
import { useBehavior } from "../model";

import './EventSuccessPage.scss';

export const EventSuccessPage = () => {
  const {
    isOrganizer,
    handleGoToApplications,
    handleGoToSearch
  } = useBehavior();

  return (
    <div className="event-success-page">
      <h2 className="event-success-page__title">
        {
          isOrganizer 
          ? `Вы успешно создали мероприятие!\nНайти информацию о нем можно в разделе`
          : `Вы успешно подали заявку на мероприятие!\nОтслеживайте ее статус в разделе`
        }
        <a className="event-success-page__link" onClick={handleGoToApplications}>
          &nbsp;
          {
            isOrganizer ? `Управление мероприятиями` : `Активные заявки`
          }
        </a>
        <br/>в личном кабинете
      </h2>
      <Button className="event-success-page__button" onClick={handleGoToSearch}>
        {`Вернуться к ${
          isOrganizer ? "созданию" : "поиску других"} мероприятий`
          }
      </Button>
      <img src={isOrganizer ? files : computer} className="event-success-page__img" />
    </div>
  );
};
