import getElementFromTemplate from '../render-element.js';
import moduleGreeting from './module-greeting.js';

const mainTemplate = `
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>
`;

const changeScreenToGreeting = () => document.querySelector(`.intro__asterisk`).addEventListener(`click`, moduleGreeting);

const moduleMain = () => {
  getElementFromTemplate(mainTemplate);
  changeScreenToGreeting();
};

export default moduleMain;
