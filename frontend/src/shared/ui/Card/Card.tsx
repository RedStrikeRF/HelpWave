import { CardProps } from "./types";

export const Card = ({
  title,
  dateRange,
  time,
  location,
  category,
  imageUrl,
  onClick,
  className }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={className}
    >
      <h3>{title}</h3>
      <div className="card-content">
        <img src={imageUrl} alt={title} />
        <div className="details">
          <div><span>📅</span>{dateRange}</div>
          <div><span>⏰</span>{time}</div>
          <div><span>📍</span>{location}</div>
          <div><span>🏷️</span>{category}</div>
        </div>
      </div>
    </div>
  );
};