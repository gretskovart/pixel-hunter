import moduleGame1 from './module-game-1.js';
import moduleBackBtn from './components/module-back-btn.js';
import RulesView from './../view/view-rules.js';

const getRulesScreen = () => {
  const rules = new RulesView();
  const rulesScreen = rules.render();

  rules.submitStartGame = moduleGame1;
  rules.changeNameInput = () => {
    let nameInput = document.querySelector(`.rules__input`);
    let formBtn = document.querySelector(`.rules__button`);

    if (nameInput.value.length > 1) {
      formBtn.removeAttribute(`disabled`);
    }
  };

  rules.bind();
  moduleBackBtn(); // ?

  return rulesScreen;
};

export default getRulesScreen;
