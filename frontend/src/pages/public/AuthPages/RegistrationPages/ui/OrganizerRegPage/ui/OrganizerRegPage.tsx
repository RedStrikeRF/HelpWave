import { useBehavior } from '../model';
import { Input, DefaultButton } from '@shared/ui';

import '../../RegistrationPage.scss';

export const OrganizerRegPage = () => {
  const {
    orgName,
    inn,
    region,
    lastName,
    firstName,
    middleName,
    email,
    password,
    setOrgName,
    setInn,
    setRegion,
    setLastName,
    setFirstName,
    setMiddleName,
    setEmail,
    setPassword,
    handleRegister,
    error
  } = useBehavior();

  return (
    <div className="auth__form__container">
      <form className="auth__form" onSubmit={handleRegister}>
        <h2 className="auth__form__title">Регистрация для организации</h2>

        <div className="auth__form__top">
          <p className="auth__form__desrciption">
            Уже есть учетная запись?
          </p>
          <div className="auth__form__links">
            <a href="/login" className="auth__form__links__link">Войти в систему</a>
          </div>
        </div>

        <Input
          className="auth__form__input"
          type="text"
          placeholder="Название организации*"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="text"
          placeholder="ИНН организации*"
          value={inn}
          onChange={(e) => setInn(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="text"
          placeholder="Регион*"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="text"
          placeholder="Фамилия*"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="text"
          placeholder="Имя*"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="text"
          placeholder="Отчество"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="email"
          placeholder="Адрес электронной почты*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="password"
          placeholder="Пароль*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="auth__form__error">{error}</div>}
        <DefaultButton className="auth__form__button" type="submit">Зарегистрироваться</DefaultButton>
      </form>
    </div>
  );
}