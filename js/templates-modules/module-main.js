import getElementFromTemplate from './../render-element.js';
import moduleGreeting from './module-greeting.js';

const moduleMain = () => {
  const moduleMainTemplate = getElementFromTemplate(`
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
  `);

  (document.querySelector(`.intro__asterisk`)).addEventListener(`click`, moduleGreeting);

  return moduleMainTemplate;
};

export default moduleMain;
