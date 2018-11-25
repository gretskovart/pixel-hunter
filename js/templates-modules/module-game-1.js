import getElementFromTemplate from './../render-element.js';
import moduleGame2 from './module-game-2.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameName from './../data/utils/get-game-name.js';
import game1 from './../data/utils/get-game-1.js';
import game from './../data/utils/game.js';

const game1Template = `
  ${gameHeader}
  <section class="game">
    ${gameName(`game-1`)}
    <form class="game__content">
      ${game1}
    </form>
      <ul class="stats">
        ${gameStats()}
      </ul>
  </section>
`;

const selectAnswersGame1Handlers = () => {
  let inputs = document.querySelectorAll(`.visually-hidden`);
  let checkAnsweredInputs = Array.prototype.slice.call(inputs).filter((input) => input.checked === true);

  if (checkAnsweredInputs.length === 2) {
    moduleGame2();
  }
};

const changeFormGame1 = () => {
  let form = document.querySelector(`.game__content`);

  form.addEventListener(`change`, selectAnswersGame1Handlers);
};

const moduleGame1 = () => {
  getElementFromTemplate(game1Template);
  selectAnswersGame1Handlers();
  changeFormGame1();
  moduleBackBtn();
  game();
};

export default moduleGame1;
