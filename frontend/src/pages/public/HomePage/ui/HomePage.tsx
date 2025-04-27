import React, { useState } from 'react';
import './HomePage.scss';
import { Button } from '@shared/ui';

import s from '@shared/assets/ss.svg';
import n from '@shared/assets/n.svg';
import o from '@shared/assets/o.svg';
import p from '@shared/assets/p.svg';
import l from '@shared/assets/l.svg';

export const HomePage = () => {
  const [activeSection, setActiveSection] = useState<'hero' | 'volunteer' | 'organizer'>('hero');

  return (
    <div className="home-page">
      {activeSection === 'hero' && (
        <section className="hero-section">
          <div className='hero-section__image'>
            <img src={s} alt="Изображение" />
          </div>
          <div className='hero-section__text'>
            <h2>Вместе мы меняем мир к лучшему!</h2>
            <div className="content">
              <p>
                Каждый из нас может сделать доброе дело. Любое маленькое действие способно вызвать большую перемену. 
                Мы — сообщество волонтеров, которые верят: чтобы изменить мир, не нужно быть супергероем. 
                Достаточно просто начать — с улыбки, с помощи, с участия.
              </p>
              <p>
                HELP WAVE — это место, где встречаются те, кто хочет помочь, и те, кому нужна поддержка. 
                Здесь начинаются истории настоящей заботы, единства и надежды.
              </p>
              <p>
                Присоединяйся к нам — стань частью перемен! Вместе мы строим мир, в котором доброта — это сила.
              </p>
            </div>
            <div className="buttons">
              <Button 
                className="btn-volunteer" 
                onClick={() => setActiveSection('volunteer')}
              >
                <span className='btn-hero-text'>Я — волонтер</span>
              </Button>
              <Button 
                className="btn-organizer" 
                onClick={() => setActiveSection('organizer')}
              >
                <span className='btn-hero-text'>Я — организатор</span>
              </Button>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'volunteer' && (
        <section className="info-section volunteer-section">
          <button 
            className="back-button"
            onClick={() => setActiveSection('hero')}
          >
            ← Назад
          </button>
          <h2>Хотите стать волонтером?</h2>
          <div className='info-descr-section'>
            <div className='info-descr-text'>
              <p className="subtitle">Вы по адресу!</p>
              <p className="description">
                С помощью нашего сайта вы можете легко начать свой путь в мире волонтерства:
              </p>
              <ul className="steps">
                <li>выбирайте любое доступное событие — по интересующей вас категории или по дате;</li>
                <li>подавайте заявку на участие в один клик;</li>
                <li>дождитесь одобрения от организатора — вы получите уведомление, как только ваша заявка будет принята.</li>
              </ul>
            </div>
            <div className='info-descr-image'>
              <img src={n} alt="Изображение" />
            </div>
          </div>
          
          <div className='info-descr-section'>
            <div className='info-descr-image'>
              <img src={o} alt="Изображение" />
            </div>
            <div className='info-descr-text'>
              <p>Возможности для волонтеров:</p>
              <ul className="features">
                <li className="feature">
                  <p>Удобный поиск событий</p>
                </li>
                <p>Фильтруйте события по дате, категории или месту проведения.</p>
                <li className="feature">
                  <p>Личный кабинет волонтера</p>
                </li>
                <p>Следите за статусами заявок, получайте сертификаты и баллы за участие.</p>
                <li className="feature">
                  <p>Система рейтинга и отзывов</p>
                </li>
                <p>Набирайте очки, получайте благодарности от организаторов и становитесь частью надежного сообщества.</p>
                <li className="feature">
                  <p>Онлайн-подтверждение участия</p>
                </li>
                <p>Забудьте о бумажках — подтверждение участия теперь в один клик.</p>
              </ul>
            </div>
          </div>
          
          
          <div className="closing">
            <p>
              Спасибо, что выбираете нас!<br />
              Мы рады быть частью вашего волонтерского пути. Каждое ваше участие — это вклад в доброе дело, 
              в развитие общества и в себя. Желаем Вам вдохновения, ярких эмоций и новых полезных знакомств! 
              Вместе — сильнее. Добро начинается с тебя!
            </p>
          </div>
          <button className="register-btn">Зарегистрироваться</button>
        </section>
      )}

      {activeSection === 'organizer' && (
        <section className="info-section volunteer-section">
          <button 
            className="back-button"
            onClick={() => setActiveSection('hero')}
          >
            ← Назад
          </button>
          <h2>Хотите организовать волонтерское событие?</h2>
          <div className='info-descr-section'>
            <div className='info-descr-text'>
              <p className="subtitle">Добро пожаловать!</p>
              <p className="description">
                С помощью нашего сайта вы можете легко найти помощников для любого мероприятия:
              </p>
              <ul className="steps">
                <li>разместите событие в удобной форме — укажите дату, место, описание и количество волонтеров;</li>
                <li>получайте заявки от волонтеров и выбирайте подходящих участников;</li>
                <li>одобряйте заявки в один клик — волонтеры сразу получат уведомление.</li>
              </ul>
            </div>
            <div className='info-descr-image'>
              <img src={p} alt="Изображение" />
            </div>
          </div>
          
          <div className='info-descr-section'>
            <div className='info-descr-image'>
              <img src={l} alt="Изображение" />
            </div>
            <div className='info-descr-text'>
              <p>Возможности для организаторов:</p>
              <ul className="features">
                <li className="feature">
                  <p>Удобное создание и управление событиями</p>
                </li>
                <p>Добавляйте мероприятия, редактируйте информацию, отслеживайте процесс набора волонтеров.</p>
                <li className="feature">
                  <p>Фильтрация заявок</p>
                </li>
                <p>Смотрите профили волонтеров, их рейтинг и принимайте обоснованные решения.</p>
                <li className="feature">
                  <p>Обратная связь</p>
                </li>
                <p>Ставьте баллы волонтерам, отмечайте их активность и награждайте благодарностями.</p>
                <li className="feature">
                  <p>Автоматизация процессов</p>
                </li>
                <p>Уведомления, списки участников, подтверждение участия — все работает автоматически.</p>
              </ul>
            </div>
          </div>
          
          
          <div className="closing">
            <p>
              Спасибо, что создаете возможности для добра!<br />
              Ваш вклад неоценим — Вы не только организуете важные мероприятия, но и даете людям шанс стать частью чего-то большего. Мы гордимся тем, что Вы выбрали наш сервис для поиска волонтеров. Желаем успешных событий, надежных помощников и вдохновения на новые добрые дела! С нами — проще. Вместе — сильнее.
            </p>
          </div>
          <button className="register-btn">Зарегистрироваться</button>
        </section>
      )}
    </div>
  );
};
