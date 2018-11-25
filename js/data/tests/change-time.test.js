import {assert} from 'chai';
import changeTime from './../utils/change-time.js';
import gameInfo from './../game-info.js';

describe(`Изменение времени`, () => {
  it(`Время - это число`, () => {
    const initialTime = gameInfo.time;
    const initialLevel = gameInfo.level;
    const currentTime = changeTime(initialLevel, initialTime);

    assert.equal(currentTime, 1);
    assert.equal(changeTime(2, 29), 30);
    assert.equal(changeTime(2, 30), 0);
  });

  it(`Время не может быть отрицательным`, () => {
    const initialLevel = gameInfo.level;
    const initialTime = -1;

    assert.throws(() => changeTime(initialLevel, initialTime), Error, `Время не может быть отрицательным`);
  });

  it(`Максимальный уровень - 10`, () => {
    const initialLevel = gameInfo.level;
    const initialTime = 31;

    assert.throws(() => changeTime(initialLevel, initialTime), Error, `Время должно быть не больше переменной TIME_LIMIT`);
  });
});
