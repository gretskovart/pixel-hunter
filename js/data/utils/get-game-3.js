import {getImg} from './get-img';

const ANSWERS_COUNT_GAME_3 = 3;

const getGame3 = () => {
  const game = [];

  for (let index = 0; index < ANSWERS_COUNT_GAME_3; index++) {
    let imgUrl = getImg();

    game.push(`
    <div class="game__option">
      <img src="${imgUrl}" alt="Option 1" width="304" height="455">;
    </div>`);
  }

  return game.join(``);
};

export default getGame3;
