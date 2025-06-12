import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickableBlock, DefaultButton, Input, GrayBackground, EditButton } from '@shared/ui';
import './VolunteerProfileEditPage.scss';

export const VolunteerProfileEditPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lastName: 'Иванов',
    firstName: 'Иван',
    middleName: 'Иванович',
    birthDate: '01.01.1990',
    email: 'ivanov@example.com',
    password: '',
    phone: '+7 (123) 456-78-90',
    skills: '',
    interests: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь логика сохранения данных
    navigate('/volunteer/profile');
  };

  return (
    <form className="profile-edit-form" onSubmit={handleSubmit}>
      <div className="profile-edit-form__container">
        <div className="profile-edit-form__left">
          <h1 className="profile-edit-form__title">Редактирование профиля</h1>
          
          <div className="profile-edit-form__content-container">
            <GrayBackground className="profile-edit-form__section">
              <h2 className="profile-edit-form__section-title">Основная информация</h2>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Фамилия*"
                className="profile-edit-form__input"
              />
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Имя*"
                className="profile-edit-form__input"
              />
              <Input
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Отчество*"
                className="profile-edit-form__input"
              />
              <Input
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                placeholder="Дата рождения*"
                type="date"
                className="profile-edit-form__input"
              />
              <Input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Адрес электронной почты*"
                type="email"
                className="profile-edit-form__input"
              />
              <Input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Пароль*"
                type="password"
                className="profile-edit-form__input"
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Номер телефона"
                type="tel"
                className="profile-edit-form__input"
              />
            </GrayBackground>

            <GrayBackground className="profile-edit-form__section">
              <h2 className="profile-edit-form__section-title">Дополнительная информация</h2>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="Навыки"
                className="profile-edit-form__textarea"
                rows={4}
              />
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="Интересы"
                className="profile-edit-form__textarea"
                rows={4}
              />
            </GrayBackground>
          </div>
          

          <div className="profile-edit-form__actions">
            <EditButton 
              type="button" 
              onClick={() => navigate('/volunteer/profile')}
              className="profile-edit-form__cancel-button"
            >
              Отмена
            </EditButton>
            <DefaultButton 
              type="submit"
              className="profile-edit-form__save-button"
            >
              Сохранить
            </DefaultButton>
          </div>
        </div>
      </div>
    </form>
  );
};