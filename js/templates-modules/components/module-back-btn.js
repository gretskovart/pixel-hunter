import moduleGreeting from './../module-greeting.js';
import gameInfo from './../../data/game-info.js';

const clickBackBtn = (nextModule) => {
  let backBtn = document.querySelector(`.back`);

  backBtn.addEventListener(`click`, () => {
    clearInfo();
    nextModule();
  });
};

let clearInfo = () => {
  gameInfo.level = 1;
  gameInfo.lives = 3;
  gameInfo.time = 0;
  gameInfo.answers.length = 0;
};

export default () => {
  clickBackBtn(moduleGreeting);
};
