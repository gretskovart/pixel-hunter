import AbstractView from './abstract-view.js';
import gameStats from './../templates-modules/components/game-stats.js';

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
          <div class="game__option" data-is-correct="${option.isCorrect}">
            <img src="${option.src}" alt="Option 1" width="304" height="455">
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
      const isCorrect = option.dataset.isCorrect === `true`;
      const answer = isCorrect;

      this.onAnswer(answer);
    }
  }

  bind() {
    document.querySelector(`.game__content`).addEventListener(`click`, (evt) => this.formChangeHandler(evt));
  }
}

export default Game3View;
