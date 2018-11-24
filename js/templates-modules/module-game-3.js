import getElementFromTemplate from './../render-element.js';
import moduleStats from './module-stats.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameQuestions from './../data/game-questions.js';
import {firstImageGame3, secondImageGame3, thirdImageGame3} from './components/game-images.js';

const game3Template = `
  ${gameHeader}
  <section class="game">
    <p class="game__task">${gameQuestions.questions.game3}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        ${firstImageGame3}
      </div>
      <div class="game__option  game__option--selected">
        ${secondImageGame3}
      </div>
      <div class="game__option">
        ${thirdImageGame3}
      </div>
    </form>
    ${gameStats}
  </section>
`;

const changeFormGame1 = () => {
  let form = document.querySelector(`.game__content`);

  form.addEventListener(`click`, moduleStats);
};

const moduleGame3 = () => {
  getElementFromTemplate(game3Template);
  changeFormGame1();
  moduleBackBtn();
};

export default moduleGame3;
