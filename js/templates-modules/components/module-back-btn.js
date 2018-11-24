import moduleGreeting from './../module-greeting.js';

const clickBackBtn = (nextModule) => {
  let backBtn = document.querySelector(`.back`);

  backBtn.addEventListener(`click`, nextModule);
};

export default () => {
  clickBackBtn(moduleGreeting);
};
