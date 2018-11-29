import getElementFromTemplate from './../render-element.js';
import moduleBackBtn from './components/module-back-btn.js';
import getTotalStats from './components/total-game-stats.js';

const statsTemplate = () => {
  return `
    <header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>
    <section class="result">
    <h2 class="result__title">Победа!</h2>
    <table class="result__table">
      ${getTotalStats()}
    </table>
    </section>`;
};

const moduleStats = () => {
  getElementFromTemplate(statsTemplate());
  moduleBackBtn();
};

export default moduleStats;
