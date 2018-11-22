// функция выводящая массив ответов
// параметры :
// - количество правильных ответов,
// - количество ответов
// - количество быстрых ответов
// - количество медленных ответов
// - количество обычных ответов

const answersArrConstruct = (len, right, quickly, slow, normal) => {
  if (right > len || quickly + slow + normal > len) {
    throw new Error(`Не верно указаны параметры. Общее количество ответов - ` + len);
  }

  let answersArr = [];

  answersArr = arrConstruct(len, answersArr);

  if (right > 0) {
    answersRightConstruct(answersArr, right);
  }

  answersTimeConstruct(quickly, slow, normal, answersArr);

  return answersArr;
};

const answersRightConstruct = (arr, right) => {
  for (let index = 0; index < right; index++) {
    arr[index].right = true;
  }
};

const answersTimeConstruct = (quickly, slow, normal, arr) => {
  const QUICKLY_TIME = 9;
  const SLOW_TIME = 21;
  const NORMAL_TIME = 11;

  const type = {
    q: quickly,
    s: slow,
    n: normal
  };

  if (type.q > 0) {
    addTimes(QUICKLY_TIME, arr, type.q);
  }

  if (type.s > 0) {
    addTimes(SLOW_TIME, arr, type.s);
  }

  if (type.n > 0) {
    addTimes(NORMAL_TIME, arr, type.n);
  }
};

const addTimes = (timeNumber, arr, type) => {
  for (let index = 0; index < arr.length && type > 0; index++) {
    if (arr[index].time === null) {
      arr[index].time = timeNumber;
      type--;
    }
  }
};


const arrConstruct = (len, arr) => {
  for (let index = 0; index < len; index++) {
    arr.push({
      right: false,
      time: null
    });
  }

  return arr;
};

export default answersArrConstruct;
