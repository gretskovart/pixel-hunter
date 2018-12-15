import constants from './../data/constants.js';
import AbstractView from './abstract-view.js';
import gameStats from './../templates-modules/components/game-stats.js';

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
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo" data-is-correct="${option.answers[0]}">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint" data-is-correct="${option.answers[1]}">
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

  formChangeHandler() {
    const gameAnswers = document.querySelector(`.game__content`).querySelectorAll(`.game__answer input[type="radio"]`);
    const areAllAnswered = Array.from(gameAnswers).filter(({checked}) => checked).length === constants.GAME_1_COUNT_OF_ANSWERS;

    if (areAllAnswered) {
      const isCorrect = Array.from(gameAnswers).filter((answer) => answer.checked && answer.dataset.isCorrect === `true`).length === constants.GAME_1_COUNT_OF_ANSWERS;
      const answer = isCorrect;

      this.onAnswer(answer);
    }
  }

  bind() {
    document.querySelector(`.game__content`).addEventListener(`change`, () => this.formChangeHandler());
  }
}

export default Game1View;
