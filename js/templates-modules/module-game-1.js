import moduleGame2 from './module-game-2.js';
import moduleBackBtn from './components/module-back-btn.js';
import Game1View from './../view/view-game-1.js';

const getGame1Screen = () => {
  const game1 = new Game1View();
  const game1Screen = game1.render();

  game1.selectAnswersGame1 = () => {
    let inputs = document.querySelectorAll(`.visually-hidden`);
    let checkAnsweredInputs = Array.prototype.slice.call(inputs).filter((input) => input.checked === true);

    if (checkAnsweredInputs.length === 2) {
      moduleGame2();
    }
  };

  game1.bind();
  moduleBackBtn(); // ?

  return game1Screen;
};

export default getGame1Screen;
