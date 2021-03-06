import AbstractView from "./abstract-view.js";
import constants from './../data/constants.js';

class HeaderView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
        ${this.state ? this._getHeartsTemplate() : ``}
      </header>`;
  }

  _getHeartsTemplate() {
    const gameHeart = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
    const gameHeartEmpty = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;

    let countOfLives = this.state.lives;
    let countOfEmptyLives = constants.COUNT_OF_LIVES - countOfLives;
    let heartsTemplate = ``;

    while (countOfEmptyLives > 0) {
      heartsTemplate += gameHeartEmpty;
      countOfEmptyLives--;
    }

    while (countOfLives > 0) {
      heartsTemplate += gameHeart;
      countOfLives--;
    }

    return `<div class="game__timer">${this.state.time}</div>
              <div class="game__lives">
                ${heartsTemplate}
              </div>`;
  }

  _clearInfo() {
    this.state.level = 1;
    this.state.lives = 3;
    this.state.time = 0;
    this.state.answers.length = 0;
  }

  getBack() {}

  bind() {
    const backBtn = document.querySelector(`.back`);

    if (backBtn) {
      document.querySelector(`.back`).addEventListener(`click`, () => this.getBack());
    }
  }
}

export default HeaderView;
