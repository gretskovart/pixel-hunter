import getElementFromTemplate from './../render-element.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameName from './../data/utils/get-game-name.js';
import game3 from './../data/utils/get-game-3.js';
import moduleGame1 from './module-game-1.js';
import game from './../data/utils/game.js';

const game3Template = `
  ${gameHeader}
  <section class="game">
    ${gameName(`game-3`)}
    <form class="game__content  game__content--triple">
      ${game3}
    </form>
      <ul class="stats">
        ${gameStats()}
      </ul>
  </section>
`;

const changeFormGame1 = () => {
  let form = document.querySelector(`.game__content`);

  form.addEventListener(`click`, moduleGame1);
};

const moduleGame3 = () => {
  getElementFromTemplate(game3Template);
  changeFormGame1();
  moduleBackBtn();
  game();
};

export default moduleGame3;
