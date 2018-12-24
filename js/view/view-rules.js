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

    this._element = document.createElement(`div`);
    this._element.appendChild(this._header.render());
    this._element.appendChild(this.render());

    return this._element;
  }

  submitStartGame() {}

  getBack() {}

  bind() {
    const nameInput = document.querySelector(`.rules__input`);
    const formBtn = document.querySelector(`.rules__button`);

    const changeNameInputHandler = () => {
      if (nameInput.value.length > 1) {
        formBtn.removeAttribute(`disabled`);
      }
    };

    const submitFormHandler = (evt) => {
      evt.preventDefault();
      this.submitStartGame(nameInput.value);
    };

    document.addEventListener(`keyup`, changeNameInputHandler);
    document.querySelector(`.rules__form`).addEventListener(`submit`, submitFormHandler);
    document.querySelector(`.back`).addEventListener(`click`, this.getBack);
  }
}

export default RulesView;
