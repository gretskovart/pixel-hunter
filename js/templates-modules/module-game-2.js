import getElementFromTemplate from './../render-element.js';
import moduleGame3 from './module-game-3.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameName from './../data/utils/get-game-name.js';
import game2 from './../data/utils/get-game-2.js';
import game from './../data/utils/game.js';

const game2Template = (gameTemplate, stats) => {
  return `
    ${gameHeader()}
    <section class="game">
      ${gameName(`game-2`)}
      <form class="game__content  game__content--wide">
        ${gameTemplate}
      </form>
        <ul class="stats">
          ${stats}
        </ul>
    </section>
  `;
};

const changeFormGame2 = () => {
  let form = document.querySelector(`.game__content`);

  form.addEventListener(`change`, (evt) => {
    game(evt);
    moduleGame3();
  });
};

const moduleGame2 = () => {
  getElementFromTemplate(game2Template(game2(), gameStats()));
  changeFormGame2();
  moduleBackBtn();
};

export default moduleGame2;
