import games from './../game-questions.js';

export default (name) => {
  return `<p class="game__task">${games.get(name)}</p>`;
};
