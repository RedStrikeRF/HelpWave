import { ClickableBlock, DefaultButton, Input } from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import { GrayBackground } from '@shared/ui';
import hands from '@shared/assets/hands.svg';
import './ProfilePage.scss';
import { useCurrentVolunteer } from '@shared/const/mock/volunteerProfile';

export const VolunteerProfilePage = () => {
  const navigate = useNavigate();
  const currentVolunteer = useCurrentVolunteer();

  if (!currentVolunteer) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="volunteer-profile">
      <div className="volunteer-profile__container">
        <div className="volunteer-profile__left">
          <h1 className="volunteer-profile__name">
            <img src={hands} alt="Благотворитель" className="volunteer-profile__name__img" />
            <span className="volunteer-profile__name__text">
              {currentVolunteer.lastName} {currentVolunteer.firstName} {currentVolunteer.middleName}
            </span>
          </h1>

          <ClickableBlock
            title="Информация"
            to="/volunteer/profile/edit"
            showEdit={true}
          >
            <Input
              name="birthDate"
              value={currentVolunteer.birthDate}
              className="info-field"
              placeholder="Дата рождения*"
              readOnly
            />
            <Input
              name="email"
              value={currentVolunteer.email}
              className="info-field"
              placeholder="Адрес электронной почты*"
              readOnly
            />
            <Input
              name="phone"
              value={currentVolunteer.phone}
              className="info-field"
              placeholder="Номер телефона"
              readOnly
            />
          </ClickableBlock>

          <ClickableBlock
            title="Доп. информация"
            to="/volunteer/profile/edit"
            showEdit={true}
          >
            <Input
              name="skills"
              value={currentVolunteer.skills}
              className="info-field"
              placeholder="Навыки*"
              readOnly
            />
            <Input
              name="interests"
              value={currentVolunteer.interests}
              className="info-field"
              placeholder="Интересы*"
              readOnly
            />
          </ClickableBlock>
        </div>

        <div className="volunteer-profile__right">
          <div className="stats-block">
            <div className="stats-item">Баллы за участие: <span>{currentVolunteer.points}</span></div>
            <div className="stats-item">Рейтинг: <span>{currentVolunteer.rating}/10</span></div>
            <div className="stats-item">Количество мероприятий: <span>{currentVolunteer.eventsCount}</span></div>
            <div className="stats-item">Часы: <span>{currentVolunteer.hours}</span></div>
            <GrayBackground>
              <button className="stats-block__action-button"
                onClick={() => navigate('/volunteer/active-application')}>
                Активные заявки
              </button>
            </GrayBackground>
          </div>

          <ClickableBlock
            title="Сертификаты"
            to="/profile/certificates"
            showEdit={false}
          >
            {currentVolunteer.certificates.map(cert => (
              <div className="certificate-item" key={cert.id}>
                <input type="checkbox" id={`cert${cert.id}`} />
                <label htmlFor={`cert${cert.id}`}>{cert.name}</label>
                <button className="download-button">Скачать</button>
              </div>
            ))}
          </ClickableBlock>

          <div className="notifications-block">
            <h3 className="notifications-block__title">Уведомления</h3>
            {/* Здесь будут уведомления */}
          </div>
        </div>
      </div>
    </div>
  );
}