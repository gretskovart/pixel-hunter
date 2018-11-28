import info from './../game-info.js';
import changeLevel from './change-level.js';
// import changeTime from './change-time.js';
// import reduceLife from './reduce-life.js';
import gameScore from './../../templates-modules/module-stats.js';
import images from './../game-images.js';

const prepArrGame1 = [];

const GAME_2_QUESTIONS_COUNT = 2;
const NORMAL_VELOCITY = 11;
const ANSWERS_COUNT = 10;

const selectAnswers = (evt) => {
  let target = evt.target;
  let isCorrect;

  const value = target.value;

  if (target.tagName === `INPUT`) {
    let imgUrl = target.parentNode.parentNode.querySelector(`img`).src;
    let existingType = getSelectedImgType(imgUrl);
    isCorrect = (existingType === value) ? true : false;

  } else if (target.tagName === `INPUT` && target.parentNode.parentNode.classList.contains(`game__content--triple`)) {
    let imgUrl = target.querySelector(`img`).src;
    let existingType = getSelectedImgType(imgUrl);
    isCorrect = (existingType === `paint`) ? true : false;
  }

  if (target.parentNode.parentNode.parentNode.childElementCount === GAME_2_QUESTIONS_COUNT && isCorrect !== `undefined`) {
    prepArrGame1.push(isCorrect);

    if (prepArrGame1.length === GAME_2_QUESTIONS_COUNT) {
      let fullAnswer = prepArrGame1.reduce((a, b) => a * b);

      prepArrGame1.splice(0, prepArrGame1.length);
      saveAnswers(!!fullAnswer, NORMAL_VELOCITY);
    }

  } else {
    saveAnswers(isCorrect, NORMAL_VELOCITY);
  }
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

  if (info.level < ANSWERS_COUNT) {
    changeLevel(info.level);
  } else {
    gameScore();
  }
};

export default selectAnswers;
