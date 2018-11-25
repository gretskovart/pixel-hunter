const countLives = (lives) => lives * 50;

export default (answersArr, lives) => {
  const count = {total: 0};

  if (!answersArr.every((answer) => answer.right !== null)) {
    return -1;
  }

  answersArr.forEach((answer) => {
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

  return count.total + countLives(lives);
};
