import AbstractView from './abstract-view.js';
import gameHeader from './../templates-modules/components/game-header.js';
import gameName from './../data/utils/get-game-name.js';
import game2 from './../data/utils/get-game-2.js';
import gameStats from './../templates-modules/components/game-stats.js';
import game from './../data/utils/game.js';

class Game2View extends AbstractView {
  get template() {
    return `
      ${gameHeader()}
      <section class="game">
        ${gameName(`game-2`)}
        <form class="game__content game__content--wide">
          ${game2()}
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
