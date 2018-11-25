const TIME_LIMIT = 30;

export default (time) => {
  if (typeof time !== `number`) {
    throw new Error(`Время должно быть числом`);

  } else if (time < 0) {
    throw new Error(`Время не может быть отрицательным`);

  } else if (time > TIME_LIMIT) {
    throw new Error(`Время должно быть не больше переменной TIME_LIMIT`);

  } else if (time === TIME_LIMIT) {
    time = 0;

  } else if (time >= 0 && time < TIME_LIMIT) {
    time++;
  }

  return time;
};
