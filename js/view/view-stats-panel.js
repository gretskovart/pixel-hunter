import constants from './../data/constants.js';

const getStatsPanel = (answers) => {
  let statsPanel = [];

  for (let index = 0; index < constants.ANSWERS_COUNT; index++) {
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
