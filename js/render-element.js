const mainBlock = document.querySelector(`#main`);

export default (html) => {
  const template = document.createElement(`template`);

  mainBlock.innerHTML = ``;
  template.innerHTML = html;

  const content = template.content.cloneNode(true);

  mainBlock.appendChild(content);
  return mainBlock.cloneNode(true);
};
