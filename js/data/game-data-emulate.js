const answersArrConstruct = (len, answered, right, quickly, slow, normal) => {
  if (right > len || quickly + slow + normal > len) {
    throw new Error(`Не верно указаны параметры. Общее количество ответов - ` + len);
  }

  let answersArr = [];

  answersArr = arrConstruct(len, answersArr);

  if (right > 0) {
    answersRightConstruct(answersArr, answered, right);
  }

  answersTimeConstruct(quickly, slow, normal, answersArr);

  return answersArr;
};

const answersRightConstruct = (arr, answered, right) => {
  for (let index = 0; index < right; index++) {
    arr[index].right = true;
  }

  if (answered !== right) {
    for (let index = right; index < answered - right; index++) {
      arr[index].right = false;
    }
  }
};

const answersTimeConstruct = (quickly, slow, normal, arr) => {
  const QUICKLY_TIME = 9;
  const SLOW_TIME = 21;
  const NORMAL_TIME = 11;

  const type = {
    quickly,
    slow,
    normal
  };

  if (type.quickly > 0) {
    addTimes(QUICKLY_TIME, arr, type.quickly);
  }

  if (type.slow > 0) {
    addTimes(SLOW_TIME, arr, type.slow);
  }

  if (type.normal > 0) {
    addTimes(NORMAL_TIME, arr, type.normal);
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
      right: null,
      time: null
    });
  }

  return arr;
};

export default answersArrConstruct;
