import constants from './../constants.js';

export const saveAnswer = (state, isCorrect) => {
  const time = state.time;

  const answer = getStatus(time, isCorrect);

  return Object.assign({}, state, {
    answers: [...state.answers, answer]
  });
};

const getStatus = (time, isCorrect) => {
  let status;

  if (isCorrect === false) {
    status = `wrong`;

  } else if (time > constants.QUICK_RESPONSE_TIMELIMIT) {
    status = `fast`;

  } else if (time < constants.SLOW_RESPONSE_TIMELIMIT) {
    status = `slow`;

  } else if (time <= constants.QUICK_RESPONSE_TIMELIMIT && time >= constants.SLOW_RESPONSE_TIMELIMIT) {
    status = `correct`;

  }

  return status;
};

export const updateLives = (state, isCorrect) => {
  let currentCountsOfLives = state.lives;

  if (typeof currentCountsOfLives !== `number`) {
    throw new Error(`Количество жизней не является числом`);

  } else if (currentCountsOfLives < 0) {
    throw new Error(`Количество жизней не может быть отрицательным`);

  } else if (currentCountsOfLives > constants.COUNT_OF_LIVES) {
    throw new Error(`Количество жизней не может быть больше 3`);

  } else if (isCorrect === false && currentCountsOfLives > 0) {
    currentCountsOfLives -= 1;
  }

  return Object.assign({}, state, {lives: currentCountsOfLives});
};

export const changeLevel = (state) => {
  let currentLevel = state.level;

  if (typeof currentLevel !== `number`) {
    throw new Error(`Уровень не является числом`);

  } else if (currentLevel < 0) {
    throw new Error(`Уровень должен быть не меньше 0`);

  } else if (currentLevel >= constants.ANSWERS_COUNT) {
    throw new Error(`Уровень должен быть не больше 10`);

  } else {
    currentLevel += 1;
  }

  return Object.assign({}, state, {level: currentLevel});
};

export const changeTime = (state) => {
  let time = state.time;

  if (typeof time !== `number`) {
    throw new Error(`Время должно быть числом`);

  } else if (time < 0) {
    throw new Error(`Время не может быть отрицательным`);

  } else if (time > constants.TIME_LIMIT) {
    throw new Error(`Время должно быть не больше переменной TIME_LIMIT`);

  } else if (!state.time) {
    return state;

  }

  return Object.assign({}, state, {time: time - 1});
};

export const isGameLost = (state) => state.answers.filter((answer) => answer === `wrong`).length > constants.COUNT_OF_LIVES;
