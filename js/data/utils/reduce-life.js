export default (currentCountsOfLives) => {
  if (typeof currentCountsOfLives !== `number`) {
    throw new Error(`Количество жизней не является числом`);
  } else if (currentCountsOfLives < 0) {
    throw new Error(`Количество жизней не может быть отрицательным`);
  } else if (currentCountsOfLives > 3) {
    throw new Error(`Количество жизней не может быть больше 3`);
  }

  return currentCountsOfLives === 0 ? 0 : currentCountsOfLives - 1;
};
