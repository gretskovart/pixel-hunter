import info from './../../data/game-info.js';

const getStatsPanel = () => {
  let statsPanel = [];

  for (let index = 0; index < 10; index++) {
    if (info.isCorrect === false) {
      statsPanel.push(`
        <li class="stats__result stats__result--wrong"></li>`);

    } else if (info.isQuick === true) {
      statsPanel.push(`
        <li class="stats__result stats__result--fast"></li>`);

    } else if (info.isSlow === true) {
      statsPanel.push(`
        <li class="stats__result stats__result--slow"></li>`);

    } else if (info.isNormal === true) {
      statsPanel.push(`
        <li class="stats__result stats__result--correct"></li>`);
    } else {
      statsPanel.push(`
        <li class="stats__result stats__result--unknown"></li>`);
    }
  }

  return statsPanel.join(``);
};

export default getStatsPanel;
