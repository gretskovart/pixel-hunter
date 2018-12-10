import AbstractView from './abstract-view.js';
import gameStats from './../templates-modules/components/game-stats.js';
import game from './../data/utils/game.js';

class Game3View extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--triple">
        ${this.level.options.map((option) => `
          <div class="game__option">
            <img src="${option.src}" alt="Option 1" width="304" height="455">;
          </div>
        `)}
        </form>
          <ul class="stats">
            ${gameStats()}
          </ul>
      </section>
    `;
  }

  selectAnswersGame3() {}

  bind() {
    document.querySelector(`.game__content`).addEventListener(`click`, (evt) => {
      game(evt);
      this.selectAnswersGame3();
    });
  }
}

export default Game3View;
