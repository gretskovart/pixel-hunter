import image from './get-img';

const ANSWERS_COUNT_GAME_1 = 2;

const getGame1 = () => {
  const game = [];

  for (let index = 0; index < ANSWERS_COUNT_GAME_1; ++index) {
    let imgUrl = image();

    game.push(`
      <div class="game__option">
        <img src="${imgUrl}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    `);
  }

  return game.join(``);
};

const game1 = getGame1();

export {game1};

