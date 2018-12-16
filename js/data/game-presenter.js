import constants from './../data/constants.js';
import ViewHeader from './../view/view-header.js';
import Game1View from './../view/view-game-1.js';
import Game2View from './../view/view-game-2.js';
import Game3View from './../view/view-game-3.js';

export default class GamePresenter {
  constructor(data, model) {
    this.model = model;
    this.model.questions = data;

    this._header = new ViewHeader(this.model.state);
    this.bind = () => this._header.bind();

    this._header.getBack = () => this.getBack();

    this.content = this.gameLevel;

    this.root = document.createElement(`div`);
    this.root.appendChild(this._header.render());
    this.root.appendChild(this.content.render());

    this.tic = () => this.model.tic();

    this._interval = null;
    this.game = null;

    this.startTimer();
  }

  get gameLevel() {
    if (this.model.gameIsOver() || !this.model.questions[this.model.state.level]) {
      this.onEndGame(this.model.state);

      return false;
    }

    switch (this.model.questions[this.model.state.level].type) {
      case `game1`:
        this.game = new Game1View(this.model.questions[this.model.state.level]);

        break;

      case `game2`:
        this.game = new Game2View(this.model.questions[this.model.state.level]);

        break;

      case `game3`:
        this.game = new Game3View(this.model.questions[this.model.state.level]);

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
    const header = new ViewHeader(this.model.state);

    header.getBack = () => this.getBack();
    this._header.bind = () => this.bind();

    this.root.childNodes[0].replaceChild(header.render().childNodes[0], this.root.childNodes[0].childNodes[0]);

    this._header = header;
    this._header.bind();
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.model.tic();

      if (this.model.state.time <= 0) {
        this._onAnswer({isCorrect: false});
      } else {
        this.updateHeader();
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
    this.stopTimer();
    this.model.onAnswer(answer);
    this.updateHeader();
    this.updateGame();
  }

  onEndGame() {}
}
