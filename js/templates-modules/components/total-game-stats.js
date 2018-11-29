import gameInfo from './../../data/game-info.js';
import gameStats from './game-stats.js';

const ANSWERS_COUNT = 10;
const BONUS_FOR_PER_LIFE = 50;
const BONUS_FOR_TIME = 50;
const BONUS_FOR_CORRECT_ANSWER = 100;

let totalAnswersBonus = 0;
let totalLifeBonus = 0;
let totalSlowBonus = 0;
let totalFastBonus = 0;
let total = 0;

let statsTemplate;

const failTemplate = () => {
  return `
    <tr>
      <td class="result__number">2.</td>
      <td>
        <ul class="stats">
          ${gameStats()}
        </ul>
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">fail</td>
    </tr>`;
};

const getCountsOfAnswerByType = (type) => gameInfo.answers.filter((answer) => answer[type] === true).length;

const successTemplate = () => {
  let templateArr = [];

  let totalFast = getCountsOfAnswerByType(`isQuick`);
  let totalSlow = getCountsOfAnswerByType(`isSlow`);
  let totalAnswers = getCountsOfAnswerByType(`isCorrect`);

  totalFastBonus = totalFast * BONUS_FOR_TIME;
  totalSlowBonus = totalSlow * BONUS_FOR_TIME;
  totalAnswersBonus = totalAnswers * BONUS_FOR_CORRECT_ANSWER;
  totalLifeBonus = gameInfo.lives * BONUS_FOR_PER_LIFE;
  total = totalFastBonus + totalAnswersBonus + totalLifeBonus - totalSlowBonus;

  templateArr.push(`
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          ${gameStats()}
        </ul>
      </td>
      <td class="result__points">× ${BONUS_FOR_CORRECT_ANSWER}</td>
      <td class="result__total">${totalAnswersBonus}</td>
    </tr>`
  );

  if (checkTimes(`isQuick`)) {

    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${totalFast}<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× ${BONUS_FOR_TIME}</td>
        <td class="result__total">${totalFastBonus}</td>
      </tr>`
    );
  }

  if (gameInfo.lives > 0) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${gameInfo.lives}<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× ${BONUS_FOR_PER_LIFE}</td>
        <td class="result__total">${totalLifeBonus}</td>
      </tr>`
    );
  }

  if (checkTimes(`isSlow`)) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${totalSlow}<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× ${BONUS_FOR_TIME}</td>
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

const checkTimes = (prop) => {
  let count = gameInfo.answers.some((answer) => {
    return answer[prop] === true;
  });

  return !!count;
};

let getTotalStats = () => {
  if (gameInfo.answers.length !== ANSWERS_COUNT) {
    statsTemplate = failTemplate();
  } else {
    statsTemplate = successTemplate();
  }

  return statsTemplate;
};

export default getTotalStats;
