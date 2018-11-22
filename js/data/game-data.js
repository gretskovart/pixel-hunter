
const countAnswers = (answersArr) => {
  answersArr.forEach((answer) => {
    const count = {total: 0};

    if (answer.right === true) {
      count.total += 100;
    }

    if (answer.time < 10) {
      count.total += 50;
    } else if (answer.time > 20) {
      count.total -= 50;
    }

    return count.total;
  });
};

const countLives = (lives) => lives * 50;

export default (answersArr, lives) => countAnswers(answersArr) + countLives(lives);
