const mainBlock = document.querySelector(`#main`);

export default (html) => {
  const template = document.createElement(`template`);

  template.innerHTML = html;

  return mainBlock.appendChild(template.content);
};
