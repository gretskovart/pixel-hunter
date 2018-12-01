import AbstractView from './abstract-view.js';
import gameHeader from './../templates-modules/components/game-header.js';
import gameName from './../data/utils/get-game-name.js';
import game3 from './../data/utils/get-game-3.js';
import gameStats from './../templates-modules/components/game-stats.js';
import game from './../data/utils/game.js';

class Game3View extends AbstractView {
  get template() {
    return `
      ${gameHeader()}
      <section class="game">
        ${gameName(`game-3`)}
        <form class="game__content  game__content--triple">
          ${game3()}
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
