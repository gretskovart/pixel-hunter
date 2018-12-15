import ViewWelcome from './view/view-welcome.js';
import ViewRules from './view/view-rules.js';
import ViewGreeting from './view/view-greeting.js';
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
    game.content.bind();
  }

  static showStats() {
    const stats = new ViewStats();

    stats.getBack = () => Application.showGreeting();
    renderScreen(stats.render());
    stats.bind();
  }
}
