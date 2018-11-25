import getElementFromTemplate from './../render-element.js';
import moduleGame3 from './module-game-3.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameName from './../data/utils/get-game-name.js';
import game2 from './../data/utils/get-game-2.js';

const game2Template = `
  ${gameHeader}
  <section class="game">
    ${gameName(`game-2`)}
    <form class="game__content  game__content--wide">
      ${game2}
    </form>
    ${gameStats}
  </section>
`;

const changeFormGame1 = () => {
  let form = document.querySelector(`.game__content`);

  form.addEventListener(`change`, moduleGame3);
};

const moduleGame2 = () => {
  getElementFromTemplate(game2Template);
  changeFormGame1();
  moduleBackBtn();
};

export default moduleGame2;
