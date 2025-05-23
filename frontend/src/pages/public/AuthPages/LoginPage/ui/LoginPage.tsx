import { useBehavior } from '../model';
import { Input, DefaultButton } from '@shared/ui';
import flowers from '@shared/assets/flowers.svg';

import './LoginPage.scss';

export const LoginPage = () => {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleLogin,
    error
  } = useBehavior();

  return (
    <div className="auth__form__container">
      <form className="auth__form" onSubmit={handleLogin}>
        <h2 className="auth__form__title">Вход</h2>
        <div className="auth__form__top">
          <p className="auth__form__desrciption">
            Зарегестрироваться как:
          </p>
          <div className="auth__form__links">
            <a className="auth__form__links__link" href="/volunteer/registration">Волонтер</a>
            <span className="auth__form__links__divider">|</span>
            <a className="auth__form__links__link" href="/organizer/registration">Организатор</a>
          </div>
        </div>
        <Input
          className="auth__form__input"
          type="text"
          placeholder="Логин*"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="auth__form__input"
          type="password"
          placeholder="Пароль*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="auth__form__error">{error}</div>}
        <DefaultButton className="auth__form__button" type="submit">Войти</DefaultButton>
      </form>

      <div className="login__image">
        <img src={flowers} alt="Цветы" />
      </div>
    </div>
  );
}