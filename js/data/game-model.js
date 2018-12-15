import {gameInfo} from './game-info.js';
import changeTime from './utils/change-time.js';
import * as game from './../data/utils/game.js';

const GAME_STATUS_INITIAL = gameInfo;

export default class GameModel {
  constructor() {
    this.restartGame();
  }

  get state() {
    return this._state;
  }

  get currentLevel() {
    return gameInfo.level;
  }

  get currentLives() {
    return gameInfo.lives;
  }

  gameIsOver() {
    return this._state.lives <= 0;
  }

  restartGame() {
    this._state = GAME_STATUS_INITIAL;
  }

  resetTimer() {
    this._state = Object.assign({}, this._state, {time: GAME_STATUS_INITIAL.time});
  }

  tic() {
    this._state = changeTime(this._state);
  }

  onAnswer(answer) {
    game.saveAnswer(this._state, answer);
    game.updateLives(this._state, answer);
    game.changeLevel(this._state, this._state.level + 1);
  }
}
