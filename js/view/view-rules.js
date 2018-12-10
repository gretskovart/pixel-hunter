import AbstractView from './abstract-view.js';
import ViewHeader from './view-header.js';

class RulesView extends AbstractView {
  constructor() {
    super();
    this._header = new ViewHeader();
    this.getBack = () => this._header.getBack();
  }

  get template() {
    return `
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>Угадай 10 раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится 30 секунд.</li>
          <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>`;
  }

  get element() {
    if (this._element) {
      return this._element;
    }

    let template = [];

    template.push(this._header.template);
    template.push(this.template);
    this._element = template.join(``);

    return this._element;
  }

  changeNameInput() {}

  submitStartGame() {}

  getBack() {}

  bind() {
    document.addEventListener(`keyup`, this.changeNameInput);
    document.querySelector(`.rules__form`).addEventListener(`submit`, this.submitStartGame);
    document.querySelector(`.back`).addEventListener(`click`, this.getBack);
  }
}

export default RulesView;
