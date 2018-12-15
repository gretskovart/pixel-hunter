import constants from './../constants.js';

export default (state) => {
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
