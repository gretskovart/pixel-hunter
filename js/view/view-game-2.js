import AbstractView from './abstract-view.js';
import gameStats from './view-stats-panel.js';

class Game2View extends AbstractView {
  constructor(level, answers) {
    super();
    this.level = level;
    this.answers = answers;
  }

  get template() {
    return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content game__content--wide">
          <div class="game__option" data-type="${this.level.options[0].type}">
            <img src="${this.level.options[0].src}" alt="Option 1" width="${this.level.options[0].width}}" height="${this.level.options[0].height}}">
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
          ${gameStats(this.answers)}
        </ul>
      </section>
    `;
  }

  formChangeHandler(evt) {
    const target = evt.target;
    const isAnswered = target.checked;

    if (isAnswered) {
      const isCorrect = target.value === target.parentNode.parentNode.dataset.type;
      const answer = isCorrect;

      this.onAnswer(answer);
    }
  }

  bind() {
    document.querySelector(`.game__content`).addEventListener(`change`, (evt) => this.formChangeHandler(evt));
  }
}

export default Game2View;
