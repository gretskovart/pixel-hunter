import gameQuestions from './../../data/game-questions.js';
import util from './../../util.js';

const getImage = () => {
  let keys = Object.keys(gameQuestions.images);
  let typeOfImg = gameQuestions.images[keys[util(0, 1)]];

  return typeOfImg[util(0, Object.keys(typeOfImg).length)];
};

const image = {
  0: getImage(),
  1: getImage(),
  2: getImage()
};

const firstImageGame1 = `<img src="${image[0]}" alt="Option 1" width="468" height="458">`;
const secondImageGame1 = `<img src="${image[1]}" alt="Option 1" width="468" height="458">`;

const firstImageGame2 = `<img src="${image[0]}" alt="Option 1" width="705" height="455">`;

const firstImageGame3 = `<img src="${image[0]}" alt="Option 1" width="304" height="455">`;
const secondImageGame3 = `<img src="${image[1]}" alt="Option 1" width="304" height="455">`;
const thirdImageGame3 = `<img src="${image[2]}" alt="Option 1" width="304" height="455">`;

export {firstImageGame1, secondImageGame1, firstImageGame2, firstImageGame3, secondImageGame3, thirdImageGame3};
