import { DefaultButton, BackButton } from '@shared/ui';
import { useBehavior } from '../model';

import n from '@shared/assets/n.svg';
import o from '@shared/assets/o.svg';

import '../../InfoPage.scss';

export const VolunteerInfoPage = () => {
  const { handleBackClick, handleRegisterClick } = useBehavior();

  return (
    <div className="info-page full-width">
      <BackButton className="info-page__back-button" onClick={handleBackClick}>Назад</BackButton>

      <h1 className="info-page__title full-width">Хотите стать волонтером?</h1>

      <div className="info-page__content-block full-width img__rigth">
        <img className="info-page__image" src={n} alt="Волонтерская деятельность" />
        <div className="info-page__text-block">
          <p className="info-page__text">Вы по адресу!</p>
          <p className="info-page__text">
            С помощью нашего сайта вы можете легко начать свой путь в мире волонтерства:
          </p>
          <ul className="info-page__list">
            <li className="info-page__list-item marker">выбирайте любое доступное событие</li>
            <li className="info-page__list-item marker">подавайте заявку на участие</li>
            <li className="info-page__list-item marker">дождитесь одобрения от организатора</li>
          </ul>
        </div>
      </div>

      <div className="info-page__content-block full-width img__left">
        <img className="info-page__image" src={o} alt="Возможности" />
        <div className="info-page__text-block">
          <p className="info-page__text">Возможности для волонтеров:</p>
          <ul className="info-page__list">
            <li className="info-page__list-item">
              <p className="info-page__text marker">Удобный поиск событий</p>
              <p className="info-page__text">Фильтруйте события по параметрам</p>
            </li>
            <li className="info-page__list-item">
              <p className="info-page__text marker">Личный кабинет</p>
              <p className="info-page__text">Следите за статусами заявок</p>
            </li>
            <li className="info-page__list-item">
              <p className="info-page__text marker">Система рейтинга и отзывов</p>
              <p className="info-page__text">Набирайте очки, получайте благодарности от организаторов и становитесь частью надежного сообщества.</p>
            </li>
            <li className="info-page__list-item">
              <p className="info-page__text marker">Онлайн-подтверждение участия</p>
              <p className="info-page__text">Забудьте о бумажках — подтверждение участия и теперь в один клик.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="info-page__footer full-width">
        <p className="info-page__text info-page__text--left">
          Спасибо, что выбираете нас! Мы рады быть частью вашего пути.
        </p>
        <p className="info-page__text info-page__text--left">
          Мы рады быть частью вашего волонтерского пути. Каждое ваше участие — это вклад в доброе дело, в развитие общества и в себя. Желаем Вам вдохновения, ярких эмоций и новых полезных знакомств! Вместе — сильнее. Добро начинается с тебя!
        </p>
      </div>

      <DefaultButton
          onClick={handleRegisterClick}
          className="info-page__button"
        >
          Зарегистрироваться
        </DefaultButton>
    </div>
  );
};