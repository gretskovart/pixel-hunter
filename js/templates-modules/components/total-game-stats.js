import {gameInfo} from './../../data/game-info.js';
import gameStats from './../../view/view-stats-panel.js';
import constants from './../../data/constants.js';
import {isGameLost} from './../../data/utils/game.js';

let totalAnswersBonus = 0;
let totalLifeBonus = 0;
let totalSlowBonus = 0;
let totalFastBonus = 0;
let total = 0;

const failTemplate = (state, number) => {
  return `
    <tr>
      <td class="result__number">${number}</td>
      <td>
        <ul class="stats">
          ${gameStats(state.answers)}
        </ul>
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>`;
};

const getCountsOfAnswerByType = (state, type) => state.answers.filter((answer) => answer === type).length;

const successTemplate = (state, number) => {
  let templateArr = [];

  let totalFast = getCountsOfAnswerByType(state, `fast`);
  let totalSlow = getCountsOfAnswerByType(state, `slow`);
  let totalAnswers = state.answers.length - getCountsOfAnswerByType(state, `wrong`);

  totalFastBonus = totalFast * constants.BONUS_FOR_TIME;
  totalSlowBonus = totalSlow * constants.BONUS_FOR_TIME;
  totalAnswersBonus = totalAnswers * constants.BONUS_FOR_CORRECT_ANSWER;
  totalLifeBonus = state.lives * constants.BONUS_FOR_PER_LIFE;
  total = totalFastBonus + totalAnswersBonus + totalLifeBonus - totalSlowBonus;

  templateArr.push(`
    <tr>
      <td class="result__number">${number}.</td>
      <td colspan="2">
        <ul class="stats">
          ${gameStats(state.answers)}
        </ul>
      </td>
      <td class="result__points">× ${constants.BONUS_FOR_CORRECT_ANSWER}</td>
      <td class="result__total">${totalAnswersBonus}</td>
    </tr>`
  );

  if (totalFast > 0) {

    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${totalFast}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${constants.BONUS_FOR_TIME}</td>
        <td class="result__total">${totalFastBonus}</td>
      </tr>`
    );
  }

  if (state.lives > 0) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${gameInfo.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${constants.BONUS_FOR_PER_LIFE}</td>
        <td class="result__total">${totalLifeBonus}</td>
      </tr>`
    );
  }

  if (totalSlow > 0) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${totalSlow}<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${constants.BONUS_FOR_TIME}</td>
        <td class="result__total">-${totalSlowBonus}</td>
      </tr>`
    );
  }

  templateArr.push(`
    <tr>
      <td colspan="5" class="result__total  result__total--final">${total}</td>
    </tr>`
  );

  return templateArr.join(``);
};

export default (states) => {
  let panelStatsArray = [];

  states.forEach((state, index) => {
    let number = index + 1;

    if (isGameLost(state) === false) {
      panelStatsArray.push(failTemplate(state, number));
    } else if (isGameLost(state) === true) {
      panelStatsArray.push(successTemplate(state, number));
    }

    return panelStatsArray;
  });

  return panelStatsArray.join(``);
};
