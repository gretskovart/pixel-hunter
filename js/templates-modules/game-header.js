import gameInfo from './../data/game-info.js';

const LIVES_COUNT_LIMIT = 3;

const gameHeart = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;

const gameHeartEmpty = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;

const heartsCount = () => {
  let countOfLives = gameInfo.lives;
  let countOfEmptyLives = LIVES_COUNT_LIMIT - countOfLives;
  let heartsTemplate = ``;

  while (countOfEmptyLives > 0) {
    heartsTemplate += gameHeartEmpty;
    countOfEmptyLives--;
  }

  while (countOfLives > 0) {
    heartsTemplate += gameHeart;
    countOfLives--;
  }

  return heartsTemplate;
};

const gameHeartsCurrent = heartsCount();

export default `
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">NN</div>
    <div class="game__lives">
      ${gameHeartsCurrent}
    </div>
  </header>`;

