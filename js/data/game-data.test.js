import {assert} from 'chai';
import answersArrConstruct from './game-data-emulate.js';
import countScore from './game-data.js';

/*
answersArrConstruct(
  количество вопросов,
  количество ответов,
  количество правильных ответов,
  количество быстрых ответов,
  количество медленных ответов,
  количество обычных ответов
);

countScore(
  массив,
  количество оставшихся жизней
)
*/

describe(`Подсчет результатов игры`, () => {
  it(`Ответил меньше чем на 10 вопросов`, () => {
    const arr = answersArrConstruct(10, 9, 9, 0, 0, 10);
    const score = countScore(arr, 0);

    assert.equal(score, -1);
  });

  it(`Ответил на все вопросы быстро и остались все жизни`, () => {
    const arr = answersArrConstruct(10, 10, 10, 10, 0, 0);
    const score = countScore(arr, 3);

    assert.equal(score, 1650);
  });

  it(`Ответил на все вопросы быстро, жизней не осталось`, () => {
    const arr = answersArrConstruct(10, 10, 10, 10, 0, 0);
    const score = countScore(arr, 0);

    assert.equal(score, 1500);
  });

  it(`Ответил на все вопросы медленно и остались все жизни`, () => {
    const arr = answersArrConstruct(10, 10, 10, 0, 10, 0);
    const score = countScore(arr, 3);

    assert.equal(score, 650);
  });

  it(`Ответил на все вопросы медленно, жизней не осталось`, () => {
    const arr = answersArrConstruct(10, 10, 10, 0, 10, 0);
    const score = countScore(arr, 0);

    assert.equal(score, 500);
  });

  it(`Ответил на все вопросы не быстро и не медленно и остались все жизни`, () => {
    const arr = answersArrConstruct(10, 10, 10, 0, 0, 10);
    const score = countScore(arr, 3);

    assert.equal(score, 1150);
  });
});
