import getElementFromTemplate from './../render-element.js';
import moduleGame3 from './module-game-3.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameQuestions from './../data/game-questions.js';
import {firstImageGame2} from './components/game-images.js';

const game2Template = `
  ${gameHeader}
  <section class="game">
    <p class="game__task">${gameQuestions.questions.game2}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        ${firstImageGame2}
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
