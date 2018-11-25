import info from './../game-info.js';

export default (level) => {
  if (typeof level !== `number`) {
    throw new Error(`Уровень не является числом`);

  } else if (level < 1) {
    throw new Error(`Уровень должен быть не меньше 1`);

  } else if (level >= 10) {
    throw new Error(`Уровень должен быть не больше 10`);

  }

  let currentLevel = level + 1;
  info.level = currentLevel;

  return currentLevel;
};
