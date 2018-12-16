import AbstractView from './abstract-view.js';
import gameStats from './../templates-modules/components/game-stats.js';

class Game3View extends AbstractView {
  constructor(level) {
    super();
    this.level = level;

    this.gameType = this.level.question === `Найдите рисунок среди изображений` ? `paint` : `photo`;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--triple">
        ${this.level.options.map((option) => `
          <div class="game__option" data-type="${option.type}">
            <img src="${option.src}" alt="Option 1" width="${option.width}" height="${option.height}">
          </div>
        `)}
        </form>
          <ul class="stats">
            ${gameStats()}
          </ul>
      </section>
    `;
  }

  formChangeHandler(evt) {
    const option = evt.target.closest(`.game__option`);

    if (option) {
      const isCorrect = option.dataset.type === this.gameType;
      const answer = isCorrect;

      this.onAnswer(answer);
    }
  }

  bind() {
    document.querySelector(`.game__content`).addEventListener(`click`, (evt) => this.formChangeHandler(evt));
  }
}

export default Game3View;
