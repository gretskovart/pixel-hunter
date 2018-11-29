import {assert} from 'chai';
import reduceLife from './../utils/reduce-life.js';
import gameInfo from './../game-info.js';

describe(`Потеря количества жизней`, () => {
  it(`Количество жизней - это число`, () => {
    const initialCountOfLives = gameInfo.lives;
    const currentCountOfLives = reduceLife(initialCountOfLives);

    assert.equal(currentCountOfLives, 2);
  });

  it(`Количество жизней не может быть отрицательным`, () => {
    const currentCountOfLives = -1;

    assert.throws(() => reduceLife(currentCountOfLives), Error, `Количество жизней не может быть отрицательным`);
  });

  it(`Максимальный количество жизней - 3`, () => {
    const currentCountOfLives = 4;

    assert.throws(() => reduceLife(currentCountOfLives), Error, `Количество жизней не может быть больше 3`);
  });
});
