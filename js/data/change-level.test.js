import {assert} from 'chai';
import changeLevel from './change-level.js';
import gameInfo from './game-info.js';

describe(`Смена игровых уровней`, () => {
  it(`Уровень это число`, () => {
    const currentLevel = gameInfo.level;
    const nextLevel = changeLevel(currentLevel);

    assert.equal(nextLevel, 1);
  });

  it(`Уровень не может быть меньше 1`, () => {
    const currentLevel = -1;

    assert.throws(() => changeLevel(currentLevel), Error, `Уровень должен быть не меньше 1`);
  });

  it(`Максимальный уровень - 10`, () => {
    const currentLevel = 10;

    assert.throws(() => changeLevel(currentLevel), Error, `Уровень должен быть не больше 10`);
  });
});
