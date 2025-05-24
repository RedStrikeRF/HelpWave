import { DefaultButton, BackButton } from '@shared/ui';
import { useBehavior } from '../model';

import l from '@shared/assets/l.svg';
import p from '@shared/assets/p.svg';

import '../../InfoPage.scss';

export const OrganizerInfoPage = () => {
  const { handleBackClick, handleRegisterClick } = useBehavior();

  return (
    <div className="info-page full-width">
      <BackButton className="info-page__back-button" onClick={handleBackClick}>Назад</BackButton>

      <h1 className="info-page__title full-width">Хотите организовать волонтерское событие?</h1>

      <div className="info-page__content-block full-width img__rigth">
        <img className="info-page__image" src={p} alt="Волонтерская деятельность" />
        <div className="info-page__text-block">
          <p className="info-page__text">Добро пожаловать!</p>
          <p className="info-page__text">
            С помощью нашего сайта вы можете легко найти помощников для любого мероприятия:
          </p>
          <ul className="info-page__list">
            <li className="info-page__list-item marker">разместите событие в удобной форме — укажите дату, место, описание и количество волонтеров</li>
            <li className="info-page__list-item marker">получайте заявки от волонтеров и выбирайте подходящих участников</li>
            <li className="info-page__list-item marker">одобряйте заявки в один клик — волонтеры сразу получат уведомление.</li>
          </ul>
        </div>
      </div>

      <div className="info-page__content-block full-width img__left">
        <img className="info-page__image" src={l} alt="Возможности" />
        <div className="info-page__text-block">
          <p className="info-page__text">Возможности для организаторов:</p>
          <ul className="info-page__list">
            <li className="info-page__list-item">
              <p className="info-page__text marker">Удобное создание и управление событиями</p>
              <p className="info-page__text">Добавляйте мероприятия, редактируйте информацию, отслеживайте процесс набора волонтеров.</p>
            </li>
            <li className="info-page__list-item">
              <p className="info-page__text marker">Фильтрация заявок</p>
              <p className="info-page__text">Смотрите профили волонтеров, их рейтинг и принимайте обоснованные решения.</p>
            </li>
            <li className="info-page__list-item">
              <p className="info-page__text marker">Обратная связь</p>
              <p className="info-page__text">Ставьте баллы волонтерам, отмечайте их активность и награждайте благодарностями.</p>
            </li>
            <li className="info-page__list-item">
              <p className="info-page__text marker">Автоматизация процессов</p>
              <p className="info-page__text">Уведомления, списки участников, подтверждение участия — все работает автоматически.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="info-page__footer full-width">
        <p className="info-page__text info-page__text--left">
          Спасибо, что создаете возможности для добра!
        </p>
        <p className="info-page__text info-page__text--left">
          Ваш вклад неоценим — Вы не только организуете важные мероприятия, но и даете людям шанс стать частью чего-то большего. Мы гордимся тем, что Вы выбрали наш сервис для поиска волонтеров. Желаем успешных событий, надежных помощников и вдохновения на новые добрые дела! С нами — проще. Вместе — сильнее.
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
}