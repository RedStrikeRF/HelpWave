import {ClickableBlock, DefaultButton, Input} from '@shared/ui';
import { useNavigate } from 'react-router-dom';
import { GrayBackground } from '@shared/ui';
import hands from '@shared/assets/hands.svg';

import './ProfilePage.scss';

export const VolunteerProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="volunteer-profile">
      <div className="volunteer-profile__container">
        <div className="volunteer-profile__left">
          <h1 className="volunteer-profile__name">
            <img src={hands} alt="Благотворитель" className="volunteer-profile__name__img"/>
            <span className="volunteer-profile__name__text">Фамилия Имя Отчество</span>
          </h1>
          
          <ClickableBlock 
            title="Информация" 
            to="/volunteer/profile/edit"
            showEdit={true}
          >
            <Input
              name="birthDate"
              className="info-field"
              placeholder="Дата рождения*"
              readOnly
            />
            <Input
              name="email"
              className="info-field"
              placeholder="Адрес электронной почты*"
              readOnly
            />
            <Input
              name="phone"
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
              className="info-field"
              placeholder="Навыки*"
              readOnly
            />
            <Input
              name="interests"
              className="info-field"
              placeholder="Интересы*"
              readOnly
            />
          </ClickableBlock>
        </div>

        {/* Правый блок - статистика и сертификаты */}
        <div className="volunteer-profile__right">
          <div className="stats-block">
            <div className="stats-item">Баллы за участие: <span>20</span></div>
            <div className="stats-item">Рейтинг: <span>9.9/10</span></div>
            <div className="stats-item">Количество мероприятий: <span>6</span></div>
            <div className="stats-item">Часы: <span>32</span></div>
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
            <div className="certificate-item">
              <input type="checkbox" id="cert1" />
              <label htmlFor="cert1">Сертификат 1</label>
              <button className="download-button">Скачать</button>
            </div>
            <div className="certificate-item">
              <input type="checkbox" id="cert2" />
              <label htmlFor="cert2">Сертификат 2</label>
              <button className="download-button">Скачать</button>
            </div>
            <div className="certificate-item">
              <input type="checkbox" id="cert3" />
              <label htmlFor="cert3">Сертификат 3</label>
              <button className="download-button">Скачать</button>
            </div>
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