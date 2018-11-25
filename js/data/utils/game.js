import info from './../game-info.js';
import changeLevel from './change-level.js';
// import changeTime from './change-time.js';
// import reduceLife from './reduce-life.js';
import gameScore from './../../templates-modules/module-stats.js';
import images from './../game-images.js';

const makeGame = () => {
  if (info.level < 10) {
    changeLevel(info.level);
    selectAnswersHandlers();
  } else if (info.level >= 10) {
    gameScore();
  }
};

const selectAnswersHandlers = () => {
  let game = document.querySelector(`.game`);

  game.addEventListener(`change`, (evt) => {
    let target = evt.target;
    let imgUrl = target.parentNode.parentNode.querySelector(`img`).src;
    let value = target.value;
    let existingType = getSelectedImgType(imgUrl);
    let isCorrect = (existingType === value) ? true : false;

    if (target.tagName === `INPUT`) {
      saveAnswers(isCorrect, 11);
    }
  });
};

const getSelectedImgType = (url) => {
  let existingType;

  for (let [key, val] of images.entries()) {
    for (let valImg of val.values()) {
      if (valImg === url) {
        existingType = key;

        return existingType;
      }
    }
  }

  return existingType;
};

const saveAnswers = (isCorrect, time) => {
  const QUICK_RESPONSE_TIMELIMIT = 10;
  const SLOW_RESPONSE_TIMELIMIT = 20;

  let answer = {};

  answer.isCorrect = isCorrect;
  answer.isQuick = (time < QUICK_RESPONSE_TIMELIMIT) ? true : null;
  answer.isSlow = (time > SLOW_RESPONSE_TIMELIMIT) ? true : null;
  answer.isNormal = (time >= QUICK_RESPONSE_TIMELIMIT && time <= SLOW_RESPONSE_TIMELIMIT) ? true : null;

  info.answers.push(answer);
  console.log(info);
};

export default makeGame;
