import getElementFromTemplate from './../render-element.js';
import moduleStats from './module-stats.js';
import moduleBackBtn from './module-back-btn.js';

const game3Template = `
  <section class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
      </div>
    </form>
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
