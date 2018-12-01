import moduleGame3 from './module-game-3.js';
import moduleBackBtn from './components/module-back-btn.js';
import Game2View from './../view/view-game-2.js';

const getGame2Screen = () => {
  const game2 = new Game2View();
  const game2Screen = game2.render();

  game2.selectAnswersGame2 = moduleGame3;

  game2.bind();
  moduleBackBtn(); // ?

  return game2Screen;
};

export default getGame2Screen;
