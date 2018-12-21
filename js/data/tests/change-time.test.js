import {assert} from 'chai';
import {changeTime} from './../utils/game.js';
import gameInfo from './../game-info.js';

describe(`Изменение времени`, () => {
  it(`Время - это число`, () => {
    const state = gameInfo;
    const currentTime = changeTime(state).time;

    assert.equal(currentTime, 29);
  });

  it(`Время не может быть отрицательным`, () => {
    const state = Object.assign({}, gameInfo, {
      time: -1
    });

    assert.throws(() => changeTime(state), Error, `Время не может быть отрицательным`);
  });

  it(`Максимальный уровень - 10`, () => {
    const state = Object.assign({}, gameInfo, {
      time: 31
    });

    assert.throws(() => changeTime(state), Error, `Время должно быть не больше переменной TIME_LIMIT`);
  });
});
