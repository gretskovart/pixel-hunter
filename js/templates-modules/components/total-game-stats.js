import gameInfo from './../../data/game-info.js';
import gameStats from './game-stats.js';

const ANSWERS_COUNT = 10;

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

const successTemplate = () => {
  let templateArr = [];

  templateArr.push(`
    <tr>
      <td class="result__number">1.</td>
      <td colspan="2">
        <ul class="stats">
          ${gameStats()}
        </ul>
      </td>
      <td class="result__points">× 100</td>
      <td class="result__total">900</td>
    </tr>`
  );

  if (checkTimes(`isQuick`)) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1 <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">50</td>
      </tr>`
    );
  }

  if (gameStats.lives > 0) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">100</td>
      </tr>`
    );
  }

  if (checkTimes(`isSlow`)) {
    templateArr.push(`
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">-100</td>
      </tr>`
    );
  }

  templateArr.push(`
    <tr>
      <td colspan="5" class="result__total  result__total--final">950</td>
    </tr>`
  );

  return templateArr.join(``);
};

const checkTimes = (prop) => {
  gameInfo.answers.some((answer) => {
    return answer[prop] === true;
  });
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
