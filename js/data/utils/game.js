import info from './../game-info.js';
import changeLevel from './change-level.js';
// import changeTime from './change-time.js';
// import reduceLife from './reduce-life.js';
import gameScore from './../../templates-modules/module-stats.js';

const makeGame = () => {
  if (info.level < 10) {
    changeLevel(info.level);
  } else if (info.level >= 10) {
    gameScore();
  }
};

export default makeGame;
