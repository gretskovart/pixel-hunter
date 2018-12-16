import ViewWelcome from './view/view-welcome.js';
import ViewRules from './view/view-rules.js';
import ViewGreeting from './view/view-greeting.js';
import ViewStats from './view/view-stats.js';
import ViewModalError from './view/view-modal-error.js';
import GameModel from './data/game-model.js';
import GamePresenter from './data/game-presenter.js';
import {renderScreen} from './render-element.js';
import Loader from './data/loader.js';

let gameData;

export default class Application {
  static showWelcome() {
    const welcome = new ViewWelcome();

    renderScreen(welcome.render());

    Loader.loadData()
    .then((data) => {
      gameData = data;
    }).then(() => Application.showGreeting())
    .catch(Application.showModalError);
  }

  static showGreeting() {
    const greeting = new ViewGreeting();

    greeting.clickNextHandler = () => Application.showRules();

    renderScreen(greeting.render());
    greeting.bind();
  }

  static showRules() {
    const rules = new ViewRules();

    rules.submitStartGame = () => Application.showGame(gameData);
    rules.getBack = () => Application.showGreeting();

    rules.changeNameInput = () => {
      let nameInput = document.querySelector(`.rules__input`);
      let formBtn = document.querySelector(`.rules__button`);

      if (nameInput.value.length > 1) {
        formBtn.removeAttribute(`disabled`);
      }
    };

    renderScreen(rules.element);
    rules.bind();
  }

  static showGame(data) {
    const model = new GameModel();
    const game = new GamePresenter(data, model);

    game.getBack = () => {
      game.stopTimer();
      Application.showGreeting();
    };

    game.onEndGame = (state) => {
      debugger;
      Application.showStats(state);
      game.restartGame();
    };

    renderScreen(game.root);
    game.bind();
    game.content.bind();
  }

  static showStats() {
    const stats = new ViewStats();

    stats.getBack = () => Application.showGreeting();
    renderScreen(stats.render());
    stats.bind();
  }

  static showModalError(error) {
    const modalError = new ViewModalError(error);

    renderScreen(modalError.render());
  }
}
