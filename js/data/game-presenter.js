import ViewHeader from './../view/view-header.js';
import {questions} from './game-info.js';
import Game1View from './../view/view-game-1.js';
import Game2View from './../view/view-game-2.js';
import Game3View from './../view/view-game-3.js';

const ONE_SEC = 1000;

export default class GamePresenter {
  constructor(model) {
    this.model = model;

    this._header = new ViewHeader(this.model.state);
    this.bind = () => this._header.bind();
    this.getBack = () => this._header.getBack();
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
    if (!this.model.currentLevel || this.model.isOver()) {
      this.onEndGame(this.model.state);

      return false;
    }

    switch (questions[this.model.state.level].type) {
      case `game1`:
        this.game = new Game1View(questions[this.model.state.level]);
        break;

      case `game2`:
        this.game = new Game2View(questions[this.model.state.level]);
        break;

      case `game3`:
        this.game = new Game3View(questions[this.model.state.level]);
        break;
    }

    // this.game.onAnswer = (answer) => this._onAnswer(answer);

    return this.game;
  }

  get element() {
    return this.root;
  }

  updateGame() {

  }

  updateHeader() {
    const header = new ViewHeader(this.model.state);

    header.getBack = () => this.getBack();

    this.root.childNodes[0].replaceChild(header.render().childNodes[0], this.root.childNodes[0].childNodes[0]);

    this._header = header;
  }

  startTimer() {
    this._interval = setInterval(() => {
      this.tic();
      this.updateHeader();
    }, ONE_SEC);
  }

  stopTimer() {
    clearInterval(this._interval);
    this.model.resetTimer();
  }

  updateTimer() {

  }

  onAnswer() {

  }

  onEndGame() {}
}
