import {assert} from 'chai';
import countScore from './game-data.js';
import answersArrConstruct from './game-data-emulate.js';

answersArrConstruct(10, 6, 3, 4, 3);

describe(`Подсчет результатов игры`, () => {
  it(`Ответил меньше чем на 10 вопросов`, () => {
    const arr = answersArrConstruct(10, 9, 0, 0, 10);
    const score = countScore(arr, 0);

    assert.equal(score, -1);
  });

  it(`Ответил на все вопросы быстро и остались все жизни`, () => {
    const arr = answersArrConstruct(10, 10, 10, 0, 0);
    const score = countScore(arr, 3);

    assert.equal(score, 1200);
  });

  it(`Ответил на все вопросы быстро, жизней не осталось`, () => {
    const arr = answersArrConstruct(10, 10, 10, 0, 0);
    const score = countScore(arr, 0);

    assert.equal(score, 1050);
  });

  it(`Ответил на все вопросы медленно и остались все жизни`, () => {
    const arr = answersArrConstruct(10, 10, 0, 10, 0);
    const score = countScore(arr, 3);

    assert.equal(score, 1100);
  });

  it(`Ответил на все вопросы медленно, жизней не осталось`, () => {
    const arr = answersArrConstruct(10, 10, 0, 10, 0);
    const score = countScore(arr, 0);

    assert.equal(score, 950);
  });

  it(`Ответил на все вопросы не быстро и не медленно и остались все жизни`, () => {
    const arr = answersArrConstruct(10, 10, 0, 0, 10);
    const score = countScore(arr, 3);

    assert.equal(score, 1150);
  });
});
