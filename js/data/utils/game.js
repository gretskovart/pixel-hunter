const QUICK_RESPONSE_TIMELIMIT = 10;
const SLOW_RESPONSE_TIMELIMIT = 20;


export const saveAnswer = (state, isCorrect) => {
  let answerInfo = [];
  const time = state.time;

  if (isCorrect === true) {
    answerInfo.isQuick = (time < QUICK_RESPONSE_TIMELIMIT) ? true : null;
    answerInfo.isSlow = (time > SLOW_RESPONSE_TIMELIMIT) ? true : null;
    answerInfo.isNormal = (time >= QUICK_RESPONSE_TIMELIMIT && time <= SLOW_RESPONSE_TIMELIMIT) ? true : null;
  }

  answerInfo.isCorrect = isCorrect;
  state.answers.push(answerInfo);

  return state;
};

export const updateLives = (state, isCorrect) => {
  let currentCountsOfLives = state.lives;

  if (typeof currentCountsOfLives !== `number`) {
    throw new Error(`Количество жизней не является числом`);

  } else if (currentCountsOfLives < 0) {
    throw new Error(`Количество жизней не может быть отрицательным`);

  } else if (currentCountsOfLives > 3) {
    throw new Error(`Количество жизней не может быть больше 3`);

  } else if (isCorrect === false && currentCountsOfLives > 0) {
    currentCountsOfLives -= 1;
    state.lives = currentCountsOfLives;
  }

  return state;
};

export const changeLevel = (state) => {
  let currentLevel = state.level;

  if (typeof currentLevel !== `number`) {
    throw new Error(`Уровень не является числом`);

  } else if (currentLevel < 0) {
    throw new Error(`Уровень должен быть не меньше 0`);

  } else if (currentLevel >= 10) {
    throw new Error(`Уровень должен быть не больше 10`);

  } else {
    currentLevel += 1;
    state.level = currentLevel;
  }

  return state;
};
