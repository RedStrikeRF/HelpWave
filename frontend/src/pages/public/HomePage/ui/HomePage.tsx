import { DefaultButton } from '@shared/ui';
import s from '@shared/assets/ss.svg';
import { useBehavior } from '../model';
import './HomePage.scss';

export const HomePage = () => {
  const {
    navigateToVolunteerInfo,
    navigateToOrganizerInfo
  } = useBehavior();

  return (
    <section className="home-page">
      <img className='home-page__image' src={s} alt="Волонтерское сообщество" />
      <div className='home-page__text'>
        <h2 className="home-page__title">Вместе мы меняем мир к лучшему!</h2>
        <div className="home-page__content">
          <p className="home-page__paragraph">
            Каждый из нас может сделать доброе дело. Любое маленькое действие способно вызвать большую перемену. 
            Мы — сообщество волонтеров, которые верят: чтобы изменить мир, не нужно быть супергероем. 
            Достаточно просто начать — с улыбки, с помощи, с участия.
          </p>
          <p className="home-page__paragraph">
            HELP WAVE — это место, где встречаются те, кто хочет помочь, и те, кому нужна поддержка. 
            Здесь начинаются истории настоящей заботы, единства и надежды.
          </p>
          <p className="home-page__paragraph">
            Присоединяйся к нам — стань частью перемен! Вместе мы строим мир, в котором доброта — это сила.
          </p>
        </div>

        <div className="home-page__buttons">
          <DefaultButton
            className="home-page__button home-page__button__volunteer" 
            onClick={navigateToVolunteerInfo}
          >
            Я — волонтер
          </DefaultButton>
          <DefaultButton 
            className="home-page__button home-page__button__organizer" 
            onClick={navigateToOrganizerInfo}
          >
            Я — организатор
          </DefaultButton>
        </div>
      </div>
    </section>
  );
};