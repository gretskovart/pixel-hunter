import getElementFromTemplate from './../render-element.js';
import moduleGame2 from './module-game-2.js';
import moduleBackBtn from './module-back-btn.js';

const game1Template = `
  <section class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
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
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
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
