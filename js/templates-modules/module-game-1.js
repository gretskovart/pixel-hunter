import getElementFromTemplate from './../render-element.js';
import moduleGame2 from './module-game-2.js';
import moduleBackBtn from './components/module-back-btn.js';
import gameHeader from './components/game-header.js';
import gameStats from './components/game-stats.js';
import gameQuestions from './../data/game-questions.js';
import {firstImageGame1, secondImageGame1} from './components/game-images.js';

const game1Template = `
  ${gameHeader}
  <section class="game">
    <p class="game__task">${gameQuestions.questions.game1}</p>
    <form class="game__content">
      <div class="game__option">
        ${firstImageGame1}
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        ${secondImageGame1}
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${gameStats}
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
};

export default moduleGame1;
