const mainBlock = document.querySelector(`#main`);

const clearScreen = () => {
  mainBlock.innerHTML = ``;
};

export const renderScreen = (screen) => {
  clearScreen();

  mainBlock.appendChild(screen);
};

export const createElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();

  return wrapper;
};
