import {getImg} from './get-img';

const ANSWERS_COUNT_GAME_2 = 1;

const getGame2 = () => {
  const game = [];

  for (let index = 0; index < ANSWERS_COUNT_GAME_2; index++) {
    let imgUrl = getImg();

    game.push(`
      <div class="game__option">
        <img src="${imgUrl}" alt="Option 1" width="705" height="455">
      <label class="game__answer  game__answer--photo">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`);
  }

  return game.join(``);
};

const game2 = getGame2();

export default game2;
