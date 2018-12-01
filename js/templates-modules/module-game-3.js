import moduleBackBtn from './components/module-back-btn.js';
import moduleGame1 from './module-game-1.js';
import Game3View from './../view/view-game-3.js';

const getGame3Screen = () => {
  const game3 = new Game3View();
  const game3Screen = game3.render();

  game3.selectAnswersGame3 = moduleGame1;

  game3.bind();
  moduleBackBtn(); // ?

  return game3Screen;
};

export default getGame3Screen;
