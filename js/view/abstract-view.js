import {createElement} from '../data/utils/render-element.js';

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {}

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.render();
    this.bind(this._element);

    return this._element;
  }

  render() {
    return createElement(this.template);
  }

  bind() {}
}

export default AbstractView;
