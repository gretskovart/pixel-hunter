'use strict';

(function () {
  let currentScreen = 0;
  let arrows;

  const screens = document.querySelectorAll(`template`);
  const mainBlock = document.querySelector(`#main`);

  const ARROW_LEFT_CODE = 37;
  const ARROW_RIGHT_CODE = 39;


  const showScreen = (num) => {
    let fragment = document.createDocumentFragment();
    let screenSection = screens[num].content.querySelector(`section`);
    let screenTemplate = screenSection.cloneNode(true);

    fragment.appendChild(screenTemplate);
    mainBlock.appendChild(fragment);
  };

  const keyUpArrowsHandlers = (evt) => {
    evt.preventDefault();

    changeScreen(evt.keyCode, ARROW_LEFT_CODE, ARROW_RIGHT_CODE);
  };

  const clickArrowsHandlers = (evt) => {
    evt.preventDefault();

    const arrowLeft = arrows[0];
    const arrowRight = arrows[1];

    changeScreen(evt.target, arrowLeft, arrowRight);
  };

  const changeScreen = (target, left, right) => {
    switch (target) {
      case left:
        if (currentScreen > 0) {
          currentScreen--;
        } else {
          return;
        }
        break;
      case right:
        if (currentScreen < screens.length - 1) {
          currentScreen++;
        } else {
          return;
        }
        break;
    }

    clearAllChildren(mainBlock);
    showScreen(currentScreen);
  };

  const clearAllChildren = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const renderArrows = () => {
    let arrowsTemplate = document.createElement(`div`);

    arrowsTemplate.innerHTML = `
    <div class="arrows__wrap">
      <style>
        .arrows__wrap {
          position: absolute;
          top: 95px;
          left: 50%;
          margin-left: -56px;
          z-index: 999;
        }
        .arrows__btn {
          background: none;
          border: 2px solid black;
          padding: 5px 20px;
        }
      </style>
      <button class="arrows__btn"><-</button>
      <button class="arrows__btn">-></button>
    </div>
    `;

    document.body.appendChild(arrowsTemplate);

    arrows = document.querySelectorAll(`.arrows__wrap .arrows__btn`);
  };

  showScreen(currentScreen);
  renderArrows();

  document.addEventListener(`keyup`, keyUpArrowsHandlers);
  document.addEventListener(`click`, clickArrowsHandlers);
})();
