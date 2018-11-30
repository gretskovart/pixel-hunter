import moduleGreeting from './module-greeting.js';
import WelcomeView from './../view/view-welcome.js';

const getWelcomeScreen = () => {
  const welcome = new WelcomeView();
  const welcomeScreen = welcome.render();

  welcome.clickStartHandler = moduleGreeting;
  welcome.bind();

  return welcomeScreen;
};

export default getWelcomeScreen;
