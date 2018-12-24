import {assert} from 'chai';
import {updateLives} from './../utils/game.js';
import gameInfo from './../game-info.js';

describe(`Потеря количества жизней`, () => {
  it(`Количество жизней - это число`, () => {
    const state = gameInfo;

    assert.equal(updateLives(state, false).lives, 2);
  });

  it(`Количество жизней не может быть отрицательным`, () => {
    const state = Object.assign({}, gameInfo, {
      lives: -1
    });

    assert.throws(() => updateLives(state), Error, `Количество жизней не может быть отрицательным`);
  });

  it(`Максимальный количество жизней - 3`, () => {
    const state = Object.assign({}, gameInfo, {
      lives: 4
    });

    assert.throws(() => updateLives(state), Error, `Количество жизней не может быть больше 3`);
  });
});
