import moduleRules from './module-rules.js';
import GreetingView from './../view/view-greeting.js';

const getGreetingScreen = () => {
  const greeting = new GreetingView();
  const greetingScreen = greeting.render();

  greeting.clickNextHandler = moduleRules;
  greeting.bind();

  return greetingScreen;
};

export default getGreetingScreen;
