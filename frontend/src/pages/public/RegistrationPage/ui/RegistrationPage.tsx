import React from "react";
import { Link } from "react-router-dom";

import { useBehavior } from '../model';
import { Input, Button } from '@shared/ui';
import "./RegistrationPage.scss";
import logo from '@shared/assets/logo.svg';

export const RegistrationPage = () => {
  const {
    surname,
    name,
    patronymic,
    birthDate,
    email,
    password,
    error,
    success,
    setSurname,
    setName,
    setPatronymic,
    setBirthDate,
    setEmail,
    setPassword,
    handleRegister,
  } = useBehavior();

  return (
    <div className="register">
      <header className="register__header">
        <img src={logo} alt="Логотип" className="logo" />
      </header>

      <div className="register__container">
        <form className="register__form" onSubmit={handleRegister}>
          <h2>Регистрация для волонтера</h2>
          <p>
            Уже есть учетная запись? <Link to="/login">Войти в систему</Link>
          </p>
          <Input
            placeholder="Фамилия*"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <Input
            placeholder="Имя*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Отчество*"
            value={patronymic}
            onChange={(e) => setPatronymic(e.target.value)}
          />
          <Input
            type="date"
            placeholder="Дата рождения*"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Адрес электронной почты*"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Пароль*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Зарегистрироваться</Button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};