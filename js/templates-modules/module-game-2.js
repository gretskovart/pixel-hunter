import getElementFromTemplate from './../render-element.js';
import moduleGame3 from './module-game-3.js';
import moduleBackBtn from './module-back-btn.js';

const game2Template = `
  <section class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
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
