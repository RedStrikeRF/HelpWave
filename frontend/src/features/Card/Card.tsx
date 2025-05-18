import { CardProps } from "./types";
import { useBehavior } from "./model";
import { DefaultButton, DeleteButton } from "@shared/ui";

import dateIcon from '@shared/assets/date.svg';
import timeIcon from '@shared/assets/time.svg';
import locationIcon from '@shared/assets/location.svg';
import categoryIcon from '@shared/assets/category.svg';

export const Card = ({
  title,
  dateRange,
  time,
  location,
  category,
  imageUrl,
  onClick,
  className,
  status,
}: CardProps) => {
  const { isActiveOrganizer, isEventOrganizer, isVolunteer } = useBehavior();

  const getStatusBadge = () => {
    if (!isVolunteer) return null;
    
    let statusClass = "status-badge";
    switch (status) {
      case "rejected":
        statusClass += " rejected";
        break;
      case "approved":
        statusClass += " approved";
        break;
      default:
        statusClass += " pending";
    }

    return (
      <div className={statusClass}>
        {status === "rejected"
          ? "Заявка отклонена"
          : status === "approved"
          ? "Заявка одобрена"
          : "Заявка на рассмотрении"}
      </div>
    );
  };

  return (
    <div onClick={onClick} className={className}>
      <div className="card-header">
        <h3>{title}</h3>
        {!isVolunteer && getStatusBadge()}
      </div>
      <div className="card-content">
        <img src={imageUrl} alt={title} />
        <div className="details">
          <div><img src={dateIcon} alt="Дата" />{dateRange}</div>
          <div><img src={timeIcon} alt="Время" />{time}</div>
          <div><img src={locationIcon} alt="Местоположение" />{location}</div>
          <div><img src={categoryIcon} alt="Категория" />{category}</div>
        </div>
      </div>
      <div className="card-actions">
        {isActiveOrganizer && (
          <DefaultButton className="view-applications-btn">Посмотреть заявки</DefaultButton>
        )}
        {isEventOrganizer && (
          <DefaultButton className="open-event-btn">Открыть</DefaultButton>
        )}
        {!isVolunteer && (
          <DeleteButton className="cancel-application-btn">Отменить заявку</DeleteButton>
        )}
      </div>
    </div>
  );
};