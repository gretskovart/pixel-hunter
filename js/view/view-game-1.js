import AbstractView from './abstract-view.js';
import gameHeader from './../templates-modules/components/game-header.js';
import gameName from './../data/utils/get-game-name.js';
import game1 from './../data/utils/get-game-1.js';
import gameStats from './../templates-modules/components/game-stats.js';
import game from './../data/utils/game.js';

class Game1View extends AbstractView {
  get template() {
    return `
      ${gameHeader()}
      <section class="game">
        ${gameName(`game-1`)}
        <form class="game__content">
          ${game1()}
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

