import { DefaultButton, BackButton } from '@shared/ui';
import { useBehavior } from '../model';

import n from '@shared/assets/n.svg';
import o from '@shared/assets/o.svg';

import '../../InfoPage.scss';

export const VolunteerInfoPage = () => {
  const { handleBackClick, handleRegisterClick } = useBehavior();

  return (
    <div className="info-page">
      <div className="info-page__back-button">
        <BackButton onClick={handleBackClick}>
          Назад
        </BackButton>
      </div>

      <h1 className="info-page__title">Хотите стать волонтером?</h1>

      <div className="info-page__content-section info-page__content-section--image-right">
        <div className="info-page__image-wrapper">
          <img 
            className="info-page__image" 
            src={n} 
            alt="Волонтерская деятельность" 
          />
        </div>

        <div className="info-page__text-content">
          <h3 className="info-page__subtitle">Вы по адресу!</h3>
          <p>
            С помощью нашего сайта вы можете легко начать свой путь в мире волонтерства:
          </p>
          
          <ul className="info-page__list info-page__list--steps">
            <li className="info-page__list-item">
              выбирайте любое доступное событие — по интересующей вас категории или по дате;
            </li>
            <li className="info-page__list-item">
              подавайте заявку на участие в один клик;
            </li>
            <li className="info-page__list-item">
              дождитесь одобрения от организатора — вы получите уведомление, как только ваша заявка будет принята.
            </li>
          </ul>
        </div>
      </div>

      <h3 className="info-page__subheader">Возможности для волонтеров:</h3>

      <div className="info-page__content-section info-page__content-section--image-left">
        <div className="info-page__image-wrapper">
          <img 
            className="info-page__image" 
            src={o} 
            alt="Возможности для волонтеров" 
          />
        </div>

        <div className="info-page__text-content">
          <ul className="info-page__list info-page__list--features">
            <li className="info-page__list-item info-page__list-item--feature">
              <h3 className="info-page__feature-title">Удобный поиск событий</h3>
              <p className="info-page__feature-description">
                Фильтруйте события по дате, категории или месту проведения.
              </p>
            </li>
            
            <li className="info-page__list-item info-page__list-item--feature">
              <h3 className="info-page__feature-title">Личный кабинет волонтера</h3>
              <p className="info-page__feature-description">
                Следите за статусами заявок, получайте сертификаты и баллы за участие.
              </p>
            </li>
            
            <li className="info-page__list-item info-page__list-item--feature">
              <h3 className="info-page__feature-title">Система рейтинга и отзывов</h3>
              <p className="info-page__feature-description">
                Набирайте очки, получайте благодарности от организаторов и становитесь частью надежного сообщества.
              </p>
            </li>
            
            <li className="info-page__list-item info-page__list-item--feature">
              <h3 className="info-page__feature-title">Онлайн-подтверждение участия</h3>
              <p className="info-page__feature-description">
                Забудьте о бумажках — подтверждение участия теперь в один клик.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="info-page__footer">
        <p className="info-page__footer-text">
          Спасибо, что выбираете нас!<br />
          Мы рады быть частью вашего волонтерского пути. Каждое ваше участие — это вклад в доброе дело, в развитие общества и в себя. Желаем Вам вдохновения, ярких эмоций и новых полезных знакомств! Вместе — сильнее. Добро начинается с тебя!
        </p>
      </div>

      <div className="info-page__action">
        <DefaultButton
          onClick={handleRegisterClick}
          className="info-page__button info-page__button--register"
        >
          Зарегистрироваться
        </DefaultButton>
      </div>
    </div>
  );
};