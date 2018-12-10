import {gameInfo} from './game-info.js';
import changeTime from './utils/change-time.js';

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
  /*
  get currentLevel() {
    return game.getLevel(this._state.level);
  }
  */

  isOver() {
    return gameInfo.lives <= 0;
  }

  gameIsOver() {
    return this._state <= 0;
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
}
