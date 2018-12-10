import AbstractView from './abstract-view.js';
import gameStats from './../templates-modules/components/game-stats.js';
import game from './../data/utils/game.js';

class Game1View extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="game">
      <p class="game__task">${this.level.task}</p>
        <form class="game__content">
          ${this.level.options.map((option, i) => `
            <div class="game__option">
              <img src="${option.src}" alt="Option 1" width="468" height="458">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
          `).join(``)}
        </form>
          <ul class="stats">
            ${gameStats()}
          </ul>
      </section>
    `;
  }

  selectAnswersGame1() {}

  bind() {
    document.querySelector(`.game__content`).addEventListener(`change`, (evt) => {
      game(evt);
      this.selectAnswersGame1();
    });
  }
}

export default Game1View;

