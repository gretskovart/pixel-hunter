import getElementFromTemplate from './../render-element.js';
import moduleGreeting from './module-greeting.js';

const moduleMainTemplate = () => {
  getElementFromTemplate(`
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `);

  return getElementFromTemplate;
};

const changeScreenToGreeting = () => (document.querySelector(`.intro__asterisk`)).addEventListener(`click`, moduleGreeting);

const moduleMain = () => {
  moduleMainTemplate();
  changeScreenToGreeting();
};

export default moduleMain;
