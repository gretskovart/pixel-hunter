import AbstractView from './abstract-view.js';
import getTotalStats from './../templates-modules/components/total-game-stats.js';

class StatsView extends AbstractView {
  get template() {
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
  }
}

export default StatsView;
