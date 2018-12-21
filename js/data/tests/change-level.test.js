import {assert} from 'chai';
import {changeLevel} from './../utils/game.js';
import {gameInfo} from './../game-info.js';

describe(`Смена игровых уровней`, () => {
  it(`Уровень это число`, () => {
    const state = gameInfo;

    assert.equal(changeLevel(state).level, 1);
  });

  it(`Уровень не может быть меньше 0`, () => {
    const state = Object.assign({}, gameInfo, {
      level: -1
    });

    assert.throws(() => changeLevel(state), Error, `Уровень должен быть не меньше 0`);
  });

  it(`Максимальный уровень - 10`, () => {
    const state = Object.assign({}, gameInfo, {level: 10});

    assert.throws(() => changeLevel(state), Error, `Уровень должен быть не больше 10`);
  });
});
