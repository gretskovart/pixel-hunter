import AbstractView from './abstract-view.js';
import gameStats from './../templates-modules/components/game-stats.js';
import game from './../data/utils/game.js';

class Game2View extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content game__content--wide">
        <div class="game__option">
        <img src="${this.level.option.src}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
        </form>
          <ul class="stats">
            ${gameStats()}
          </ul>
      </section>
    `;
  }

  selectAnswersGame2() {}

  bind() {
    document.querySelector(`.game__content`).addEventListener(`change`, (evt) => {
      game(evt);
      this.selectAnswersGame2();
    });
  }
}

export default Game2View;
