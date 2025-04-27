import './LoginPage.scss';
import { useBehavior } from '../model';
import { Input, Button, Logo } from '@shared/ui';
import flowers from '@shared/assets/flowers.svg';
import logo from '@shared/assets/logo.svg';

export const LoginPage = () => {
  const {
    // data,
    email,
    password,
    error,
    success,
    setEmail,
    setPassword,
    handleLogin
  } = useBehavior();

  return (
    <div className="login">
      <header className="login__header">
        <Logo />
      </header>
      <div className="login__container">
        <form className="login__form" onSubmit={handleLogin}>
          <h2>Вход</h2>
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
          <button type="submit">Войти</button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>

        <div className="login__image">
          <img src={flowers} alt="Цветы" />
        </div>
      </div>
    </div>
  );
}