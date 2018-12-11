import ViewWelcome from './view/view-welcome.js';
import ViewRules from './view/view-rules.js';
import ViewGreeting from './view/view-greeting.js';
import ViewGame1 from './view/view-game-1.js';
import ViewGame2 from './view/view-game-2.js';
import ViewGame3 from './view/view-game-3.js';
import ViewStats from './view/view-stats.js';
import GameModel from './data/game-model.js';
import GamePresenter from './data/game-presenter.js';
import {renderScreen} from './render-element.js';

export default class Application {
  static showWelcome() {
    const welcome = new ViewWelcome();

    welcome.clickStartHandler = () => Application.showGreeting();

    renderScreen(welcome.render());
    welcome.bind();
  }

  static showGreeting() {
    const greeting = new ViewGreeting();

    greeting.clickNextHandler = () => Application.showRules();

    renderScreen(greeting.render());
    greeting.bind();
  }

  static showRules() {
    const rules = new ViewRules();

    rules.submitStartGame = () => Application.showGame();
    rules.getBack = () => Application.showGreeting();

    rules.changeNameInput = () => {
      let nameInput = document.querySelector(`.rules__input`);
      let formBtn = document.querySelector(`.rules__button`);

      if (nameInput.value.length > 1) {
        formBtn.removeAttribute(`disabled`);
      }
    };

    renderScreen(rules.render());
    rules.bind();
  }

  static showGame(playerName) {
    const model = new GameModel(playerName);
    const game = new GamePresenter(model);

    game.getBack = () => {
      game.stopTimer();
      Application.showGreeting();
    };

    game.onEndGame = (state) => Application.showStats(state);

    renderScreen(game.root);
    game.bind();
  }

  static showGame1() {
    const game1 = new ViewGame1();
    const game1Screen = game1.render();

    game1.selectAnswersGame1 = () => {
      let inputs = document.querySelectorAll(`.visually-hidden`);
      let checkAnsweredInputs = Array.prototype.slice.call(inputs).filter((input) => input.checked === true);

      if (checkAnsweredInputs.length === 2) {
        Application.showGame2();
      }
    };

    game1.bind();
    //    moduleBackBtn(); // ?

    return game1Screen;
  }

  static showGame2() {
    const game2 = new ViewGame2();
    const game2Screen = game2.render();

    game2.selectAnswersGame2 = Application.showGame3;

    game2.bind();
    // moduleBackBtn(); // ?

    return game2Screen;
  }

  static showGame3() {
    const game3 = new ViewGame3();
    const game3Screen = game3.render();

    game3.selectAnswersGame3 = Application.showGame1;

    game3.bind();
    // moduleBackBtn(); // ?

    return game3Screen;
  }

  static showStats() {
    const stats = new ViewStats();
    const statsScreen = stats.render();

    // moduleBackBtn(); // ?

    return statsScreen;
  }
}
