import {gameInfo} from './../data/game-info.js';

const getStatsPanel = () => {
  let statsPanel = [];

  for (let index = 0; index < 10; index++) {
    const answers = gameInfo.answers;

    if (answers.length === 0 || answers[index] === undefined) {
      statsPanel.push(`
        <li class="stats__result stats__result--unknown"></li>`);
    } else if (answers[index].isCorrect === false) {
      statsPanel.push(`
        <li class="stats__result stats__result--wrong"></li>`);

    } else if (answers[index].isQuick === true) {
      statsPanel.push(`
        <li class="stats__result stats__result--fast"></li>`);

    } else if (answers[index].isSlow === true) {
      statsPanel.push(`
        <li class="stats__result stats__result--slow"></li>`);

    } else if (answers[index].isNormal === true) {
      statsPanel.push(`
        <li class="stats__result stats__result--correct"></li>`);
    }
  }

  return statsPanel.join(``);
};

export default getStatsPanel;
