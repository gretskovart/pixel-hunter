import AbstractView from './abstract-view.js';

class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
    `;
  }

  clickStartHandler() {}

  bind() {
    document.querySelector(`.intro__asterisk`).addEventListener(`click`, this.clickStartHandler);
  }
}

export default WelcomeView;
