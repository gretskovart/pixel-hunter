const mainBlock = document.querySelector(`#main`);

export default (html) => {
  const template = document.createElement(`template`);

  mainBlock.innerHTML = ``;
  template.innerHTML = html;

  return mainBlock.appendChild(template.content);
};
