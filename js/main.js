(function () {
  'use strict';

  const mainBlock = document.querySelector(`#main`);

  const clearScreen = () => {
    mainBlock.innerHTML = ``;
  };

  const renderScreen = (screen) => {
    clearScreen();

    mainBlock.appendChild(screen);
  };

  const createElement = (template) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();

    return wrapper;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {}

    get element() {
      if (this._element) {
        return this._element;
      }

      this._element = this.render();
      this.bind(this._element);

      return this._element;
    }

    render() {
      return createElement(this.template);
    }

    bind() {}
  }

  class WelcomeView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="intro">
        <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>
    `;
    }
  }

  var constants = {
    ONE_SEC: 1000,
    TIME_TO_FLASH: 300,
    GAME_1_COUNT_OF_ANSWERS: 2,
    COUNT_OF_LIVES: 3,
    TIME_LIMIT: 30,
    LOAD_URL: `https://es.dump.academy/pixel-hunter/questions`,
    SEND_URL: `https://es.dump.academy/pixel-hunter/stats/`,
    APP_ID: `2345678`,
    ANSWERS_COUNT: 10,
    MIN_TIME: 5,
    BONUS_FOR_PER_LIFE: 50,
    BONUS_FOR_TIME: 50,
    BONUS_FOR_CORRECT_ANSWER: 100,
    QUICK_RESPONSE_TIMELIMIT: 20,
    SLOW_RESPONSE_TIMELIMIT: 10,
    STATS_TITLES: {
      WIN: `Победа!`,
      LOSE: `Поражение!`
    }
  };

  class HeaderView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

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
        ${this.state ? this._getHeartsTemplate() : ``}
      </header>`;
    }

    _getHeartsTemplate() {
      const gameHeart = `<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`;
      const gameHeartEmpty = `<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`;

      let countOfLives = this.state.lives;
      let countOfEmptyLives = constants.COUNT_OF_LIVES - countOfLives;
      let heartsTemplate = ``;

      while (countOfEmptyLives > 0) {
        heartsTemplate += gameHeartEmpty;
        countOfEmptyLives--;
      }

      while (countOfLives > 0) {
        heartsTemplate += gameHeart;
        countOfLives--;
      }

      return `<div class="game__timer">${this.state.time}</div>
              <div class="game__lives">
                ${heartsTemplate}
              </div>`;
    }

    _clearInfo() {
      this.state.level = 1;
      this.state.lives = 3;
      this.state.time = 0;
      this.state.answers.length = 0;
    }

    getBack() {}

    bind() {
      document.querySelector(`.back`).addEventListener(`click`, () => this.getBack());
    }
  }

  class RulesView extends AbstractView {
    constructor() {
      super();
      this._header = new HeaderView();
      this.getBack = () => this._header.getBack();
    }

    get template() {
      return `
      <section class="rules">
        <h2 class="rules__title">Правила</h2>
        <ul class="rules__description">
          <li>Угадай 10 раз для каждого изображения фото
            <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
            <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
          <li>Фотографиями или рисунками могут быть оба изображения.</li>
          <li>На каждую попытку отводится 30 секунд.</li>
          <li>Ошибиться можно не более 3 раз.</li>
        </ul>
        <p class="rules__ready">Готовы?</p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
      </section>`;
    }

    get element() {
      if (this._element) {
        return this._element;
      }

      this._element = document.createElement(`div`);
      this._element.appendChild(this._header.render());
      this._element.appendChild(this.render());

      return this._element;
    }

    submitStartGame() {}

    getBack() {}

    bind() {
      const nameInput = document.querySelector(`.rules__input`);
      const formBtn = document.querySelector(`.rules__button`);

      const changeNameInputHandler = () => {
        if (nameInput.value.length > 1) {
          formBtn.removeAttribute(`disabled`);
        }
      };

      const submitFormHandler = (evt) => {
        evt.preventDefault();
        this.submitStartGame(nameInput.value);
      };

      document.addEventListener(`keyup`, changeNameInputHandler);
      document.querySelector(`.rules__form`).addEventListener(`submit`, submitFormHandler);
      document.querySelector(`.back`).addEventListener(`click`, this.getBack);
    }
  }

  class GreetingView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="greeting central--blur">
        <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
        <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
        <div class="greeting__challenge">
          <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
          <p class="greeting__challenge-text">Правила игры просты:</p>
          <ul class="greeting__challenge-list">
            <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
            <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
            <li>Фотореализм обманчив и коварен.</li>
            <li>Помни, главное — смотреть очень внимательно.</li>
          </ul>
        </div>
        <button class="greeting__continue" type="button">
          <span class="visually-hidden">Продолжить</span>
          <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-right"></use>
          </svg>
        </button>
      </section>
    `;
    }

    clickNextHandler() {}

    bind() {
      document.querySelector(`.greeting__continue`).addEventListener(`click`, this.clickNextHandler);
    }
  }

  const saveAnswer = (state, isCorrect) => {
    const time = state.time;
    const answer = getStatus(time, isCorrect);

    return Object.assign({}, state, {
      answers: [...state.answers, answer]
    });
  };

  const getStatus = (time, isCorrect) => {
    let status;

    if (isCorrect === false) {
      status = `wrong`;

    } else if (time > constants.QUICK_RESPONSE_TIMELIMIT) {
      status = `fast`;

    } else if (time < constants.SLOW_RESPONSE_TIMELIMIT) {
      status = `slow`;

    } else if (time <= constants.QUICK_RESPONSE_TIMELIMIT && time >= constants.SLOW_RESPONSE_TIMELIMIT) {
      status = `correct`;
    }

    return status;
  };

  const updateLives = (state, isCorrect) => {
    let currentCountsOfLives = state.lives;

    if (typeof currentCountsOfLives !== `number`) {
      throw new Error(`Количество жизней не является числом`);

    } else if (currentCountsOfLives < 0) {
      throw new Error(`Количество жизней не может быть отрицательным`);

    } else if (currentCountsOfLives > constants.COUNT_OF_LIVES) {
      throw new Error(`Количество жизней не может быть больше 3`);

    } else if (isCorrect === false && currentCountsOfLives > 0) {
      currentCountsOfLives -= 1;
    }

    return Object.assign({}, state, {lives: currentCountsOfLives});
  };

  const changeLevel = (state) => {
    let currentLevel = state.level;

    if (typeof currentLevel !== `number`) {
      throw new Error(`Уровень не является числом`);

    } else if (currentLevel < 0) {
      throw new Error(`Уровень должен быть не меньше 0`);

    } else if (currentLevel >= constants.ANSWERS_COUNT) {
      throw new Error(`Уровень должен быть не больше 10`);

    } else {
      currentLevel += 1;
    }

    return Object.assign({}, state, {level: currentLevel});
  };

  const changeTime = (state) => {
    const time = state.time;

    if (typeof time !== `number`) {
      throw new Error(`Время должно быть числом`);

    } else if (time < 0) {
      throw new Error(`Время не может быть отрицательным`);

    } else if (time > constants.TIME_LIMIT) {
      throw new Error(`Время должно быть не больше переменной TIME_LIMIT`);

    } else if (!state.time) {
      return state;
    }

    return Object.assign({}, state, {time: time - 1});
  };

  const isGameLost = (state) => state.answers.filter((answer) => answer === `wrong`).length > constants.COUNT_OF_LIVES;

  var gameInfo = Object.freeze({
    level: 0,
    lives: 3,
    time: 30,
    answers: []
  });

  const getStatsPanel = (answers) => {
    const statsPanel = [];

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
          ${getStatsPanel(state.answers)}
        </ul>
      </td>
      <td class="result__total"></td>
      <td class="result__total  result__total--final">Fail</td>
    </tr>`;
  };

  const getCountsOfAnswerByType = (state, type) => state.answers.filter((answer) => answer === type).length;

  const successTemplate = (state, number) => {
    const templateArr = [];
    const totalFast = getCountsOfAnswerByType(state, `fast`);
    const totalSlow = getCountsOfAnswerByType(state, `slow`);
    const totalAnswers = state.answers.length - getCountsOfAnswerByType(state, `wrong`);

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
          ${getStatsPanel(state.answers)}
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

  var getTotalStats = (states) => {
    const panelStatsArray = [];

    states.reverse().forEach((state, index) => {
      const number = index + 1;

      if (isGameLost(state) === true) {
        panelStatsArray.push(failTemplate(state, number));

      } else if (isGameLost(state) === false) {
        panelStatsArray.push(successTemplate(state, number));
      }

      return panelStatsArray;
    });

    return panelStatsArray.join(``);
  };

  class StatsView extends AbstractView {
    constructor(results) {
      super();
      this.results = results;
      this.title = isGameLost(this.results.slice(-1)[0]);
    }

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
      <h2 class="result__title">${this.title ? constants.STATS_TITLES.LOSE : constants.STATS_TITLES.WIN}</h2>
      <table class="result__table">
        ${getTotalStats(this.results)}
      </table>
    </section>`;
    }

    getBack() {}

    bind() {
      document.querySelector(`.back`).addEventListener(`click`, this.getBack);
    }
  }

  class ModalErrorView extends AbstractView {
    constructor(error) {
      super();
      this.error = error;
    }

    get template() {
      return `
      <section class="modal">
        <div class="modal__inner">
          <h2 class="modal__title">Произошла ошибка!</h2>
          <p class="modal__text modal__text--error">${this.error}</p>
        </div>
      </section>`;
    }
  }

  const GAME_STATUS_INITIAL = gameInfo;

  class GameModel {
    constructor(data) {
      this.restartGame();
      this.data = data;
    }

    get state() {
      return this._state;
    }

    get currentLevel() {
      return this.data[this._state.level];
    }

    get currentLives() {
      return gameInfo.lives;
    }

    gameIsOver() {
      return isGameLost(this._state);
    }

    restartGame() {
      this._state = GAME_STATUS_INITIAL;
    }

    resetTimer() {
      this._state = Object.assign({}, this._state, {time: GAME_STATUS_INITIAL.time});
    }

    tick() {
      this._state = changeTime(this._state);
    }

    onAnswer(answer) {
      this._state = saveAnswer(this._state, answer);
      this._state = updateLives(this._state, answer);
      this._state = changeLevel(this._state, this._state.level + 1);
    }
  }

  class Game1View extends AbstractView {
    constructor(level, answers) {
      super();
      this.level = level;
      this.answers = answers;
    }

    get template() {
      return `
      <section class="game">
      <p class="game__task">${this.level.task}</p>
        <form class="game__content">
          ${this.level.options.map((option, i) => `
            <div class="game__option" data-type="${option.type}">
              <img src="${option.src}" alt="Option 1" width="${option.width}" height="${option.height}">
              <label class="game__answer game__answer--photo">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
                <span>Фото</span>
              </label>
              <label class="game__answer game__answer--paint">
                <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
                <span>Рисунок</span>
              </label>
            </div>
          `).join(``)}
        </form>
          <ul class="stats">
            ${getStatsPanel(this.answers)}
          </ul>
      </section>
    `;
    }

    formChangeHandler() {
      const gameAnswers = document.querySelector(`.game__content`).querySelectorAll(`.game__answer input[type="radio"]`);
      const areAllAnswered = Array.from(gameAnswers).filter(({checked}) => checked).length === constants.GAME_1_COUNT_OF_ANSWERS;

      if (areAllAnswered) {
        const isCorrect = Array.from(gameAnswers).filter((answer) => answer.checked && answer.value === answer.parentNode.parentNode.dataset.type).length === constants.GAME_1_COUNT_OF_ANSWERS;
        const answer = isCorrect;

        this.onAnswer(answer);
      }
    }

    bind() {
      document.querySelector(`.game__content`).addEventListener(`change`, () => this.formChangeHandler());
    }
  }

  class Game2View extends AbstractView {
    constructor(level, answers) {
      super();
      this.level = level;
      this.answers = answers;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content game__content--wide">
          <div class="game__option" data-type="${this.level.options[0].type}">
            <img src="${this.level.options[0].src}" alt="Option 1" width="${this.level.options[0].width}}" height="${this.level.options[0].height}}">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
        </form>
        <ul class="stats">
          ${getStatsPanel(this.answers)}
        </ul>
      </section>
    `;
    }

    formChangeHandler(evt) {
      const target = evt.target;
      const isAnswered = target.checked;

      if (isAnswered) {
        const isCorrect = target.value === target.parentNode.parentNode.dataset.type;
        const answer = isCorrect;

        this.onAnswer(answer);
      }
    }

    bind() {
      document.querySelector(`.game__content`).addEventListener(`change`, (evt) => this.formChangeHandler(evt));
    }
  }

  class Game3View extends AbstractView {
    constructor(level, answers) {
      super();
      this.level = level;
      this.answers = answers;
      this.gameType = this.level.question === `Найдите рисунок среди изображений` ? `paint` : `photo`;
    }

    get template() {
      return `
      <section class="game">
        <p class="game__task">${this.level.task}</p>
        <form class="game__content  game__content--triple">
        ${this.level.options.map((option) => `
          <div class="game__option" data-type="${option.type}">
            <img src="${option.src}" alt="Option 1" width="${option.width}" height="${option.height}">
          </div>
        `)}
        </form>
          <ul class="stats">
            ${getStatsPanel(this.answers)}
          </ul>
      </section>
    `;
    }

    formChangeHandler(evt) {
      const option = evt.target.closest(`.game__option`);

      if (option) {
        const isCorrect = option.dataset.type === this.gameType;
        const answer = isCorrect;

        this.onAnswer(answer);
      }
    }

    bind() {
      document.querySelector(`.game__content`).addEventListener(`click`, (evt) => this.formChangeHandler(evt));
    }
  }

  class GamePresenter {
    constructor(model) {
      this.model = model;

      this._header = new HeaderView(this.model.state);
      this.bind = () => this._header.bind();

      this._header.getBack = () => this.getBack();

      this.content = this.gameLevel;

      this.root = document.createElement(`div`);
      this.root.appendChild(this._header.render());
      this.root.appendChild(this.content.render());

      this.tick = () => this.model.tick();

      this._interval = null;
      this.game = null;

      this.startTimer();
    }

    get gameLevel() {
      if (this.model.gameIsOver() || !this.model.data[this.model.state.level]) {
        this.onEndGame(this.model.state, this.playerName);

        return false;
      }

      switch (this.model.data[this.model.state.level].type) {
        case `game1`:
          this.game = new Game1View(this.model.data[this.model.state.level], this.model.state.answers);

          break;

        case `game2`:
          this.game = new Game2View(this.model.data[this.model.state.level], this.model.state.answers);

          break;

        case `game3`:
          this.game = new Game3View(this.model.data[this.model.state.level], this.model.state.answers);

          break;
      }

      this.game.onAnswer = (answer) => this._onAnswer(answer);

      return this.game;
    }

    get element() {
      return this.root;
    }

    updateGame() {
      const level = this.gameLevel;

      if (level) {
        this.root.childNodes[1].replaceChild(level.element, this.root.childNodes[1].childNodes[0]);
        this.content = level;
        this.content.bind();
        this.startTimer();
      }
    }

    updateHeader() {
      const header = new HeaderView(this.model.state);

      header.getBack = () => this.getBack();
      this._header.bind = () => this.bind();

      this.root.childNodes[0].replaceChild(header.render().childNodes[0], this.root.childNodes[0].childNodes[0]);

      this._header = header;
      this._header.bind();
    }

    startTimer() {
      this._interval = setInterval(() => {
        this.model.tick();

        if (this.model.state.time <= 0) {
          this._onAnswer(false);

        } else {
          this.updateHeader();

          if (this.model.state.time <= constants.MIN_TIME) {
            const timer = document.querySelector(`.game__timer`);

            setTimeout(() => {
              timer.style.display = (timer.style.display === `none` ? `` : `none`);
            }, constants.TIME_TO_FLASH);
          }
        }
      }, constants.ONE_SEC);
    }

    stopTimer() {
      clearInterval(this._interval);
      this.model.resetTimer();
    }

    restartGame() {
      this.model.restartGame();
    }

    updateTimer() {

    }

    _onAnswer(answer) {
      this.model.onAnswer(answer);
      this.stopTimer();
      this.updateHeader();
      this.updateGame();
    }

    onEndGame() {}
  }

  const QuestionType = {
    'two-of-two': `game1`,
    'tinder-like': `game2`,
    'one-of-three': `game3`
  };

  const AnswerType = {
    'painting': `paint`,
    'photo': `photo`,
  };

  var dataAdapter = (data) => {
    return data.map((level) => {
      return {
        type: QuestionType[level.type],
        task: level.question,
        options: level.answers.map((answer) => {
          return {
            src: answer.image.url,
            width: answer.image.width,
            height: answer.image.height,
            type: AnswerType[answer.type]
          };
        })
      };
    });
  };

  const checkResponse = (response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  };

  const toJSON = (response) => response.json();

  class Loader {
    static loadData() {
      return fetch(`${constants.LOAD_URL}`)
      .then(checkResponse)
      .then(toJSON)
      .then(dataAdapter);
    }

    static loadResults(name) {
      return fetch(`${constants.SEND_URL}${constants.APP_ID}-${name}`)
        .then(checkResponse)
        .then(toJSON);
    }

    static saveResults(answers, lives, name) {
      const data = Object.assign({}, {answers}, {lives});
      const requestSettings = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': `application/json`
        },
        method: `POST`
      };

      return fetch(`${constants.SEND_URL}${constants.APP_ID}-${name}`, requestSettings)
        .then(checkResponse);
    }
  }

  let gameData;

  class Application {
    static showWelcome() {
      const welcome = new WelcomeView();

      renderScreen(welcome.render());

      Loader.loadData()
      .then((data) => {
        gameData = data;
      }).then(() => Application.showGreeting())
      .catch(Application.showModalError);
    }

    static showGreeting() {
      const greeting = new GreetingView();

      greeting.clickNextHandler = () => Application.showRules();

      renderScreen(greeting.render());
      greeting.bind();
    }

    static showRules() {
      const rules = new RulesView();

      rules.submitStartGame = (name) => Application.showGame(gameData, name);
      rules.getBack = () => Application.showGreeting();

      renderScreen(rules.element);
      rules.bind();
    }

    static showGame(data, name) {
      const model = new GameModel(data);
      const game = new GamePresenter(model);

      game.getBack = () => Application.showGreeting();

      game.onEndGame = (state) => {
        Loader.saveResults(state.answers, state.lives, name)
        .then(() => Application.showStats(name))
        .then(() => game.restartGame())
        .catch(Application.showModalError);
      };

      renderScreen(game.root);
      game.bind();
      game.content.bind();
    }

    static showStats(name) {
      Loader.loadResults(name)
      .then((data) => {
        const stats = new StatsView(data);

        stats.getBack = () => Application.showGreeting();
        renderScreen(stats.render());
        stats.bind();
      })
      .catch(Application.showModalError);
    }

    static showModalError(error) {
      const modalError = new ModalErrorView(error);

      renderScreen(modalError.render());
    }
  }

  Application.showWelcome();

}());

//# sourceMappingURL=main.js.map
