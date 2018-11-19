const mainBlock = document.querySelector(`#main`);

export default (html) => {
  const template = document.createElement(`template`);

  mainBlock.innerHTML = ``;
  template.innerHTML = html;

  const content = wrap(template);

  mainBlock.appendChild(content);
  return mainBlock;
};

const wrap = (it) => {
  const shadow = document.createElement(`div`);
  const content = it.content.cloneNode(true);
  shadow.appendChild(content);

  return shadow.cloneNode(true);
};

