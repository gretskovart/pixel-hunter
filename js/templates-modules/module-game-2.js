import getElementFromTemplate from './../render-element.js';
import moduleGame3 from './module-game-3.js';
import moduleBackBtn from './module-back-btn.js';

const game2Template = `
  <header class="header">
  <button class="back">
    <span class="visually-hidden">Вернуться к началу</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>
  </button>
  <div class="game__timer">NN</div>
  <div class="game__lives">
    <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
    <img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">
  </div>
  </header>
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
  <ul class="stats">
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--correct"></li>
    <li class="stats__result stats__result--wrong"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--slow"></li>
    <li class="stats__result stats__result--unknown"></li>
    <li class="stats__result stats__result--fast"></li>
    <li class="stats__result stats__result--unknown"></li>
  </ul>
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
