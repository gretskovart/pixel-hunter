import {assert} from 'chai';
import changeTime from './../utils/change-time.js';
import gameInfo from './../game-info.js';

describe(`Изменение времени`, () => {
  it(`Время - это число`, () => {
    const initialTime = gameInfo.time;
    const currentTime = changeTime(initialTime);

    assert.equal(currentTime, 1);
    assert.equal(changeTime(29), 30);
    assert.equal(changeTime(30), 0);
  });

  it(`Время не может быть отрицательным`, () => {
    const initialTime = -1;

    assert.throws(() => changeTime(initialTime), Error, `Время не может быть отрицательным`);
  });

  it(`Максимальный уровень - 10`, () => {
    const initialTime = 31;

    assert.throws(() => changeTime(initialTime), Error, `Время должно быть не больше переменной TIME_LIMIT`);
  });
});
