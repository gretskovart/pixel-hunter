import {gameInfo} from './../data/game-info.js';

const getStatsPanel = (state = gameInfo) => {
  let statsPanel = [];

  for (let index = 0; index < 10; index++) {
    const answers = state.answers;

    if (answers.length === 0 || answers[index] === undefined) {
      statsPanel.push(`
        <li class="stats__result stats__result--unknown"></li>`);
    } else if (answers[index] === `wrong`) {
      statsPanel.push(`
        <li class="stats__result stats__result--wrong"></li>`);

    } else if (answers[index] === `fast`) {
      statsPanel.push(`
        <li class="stats__result stats__result--fast"></li>`);

    } else if (answers[index] === `slow`) {
      statsPanel.push(`
        <li class="stats__result stats__result--slow"></li>`);

    } else if (answers[index] === `correct`) {
      statsPanel.push(`
        <li class="stats__result stats__result--correct"></li>`);
    }
  }

  return statsPanel.join(``);
};

export default getStatsPanel;
