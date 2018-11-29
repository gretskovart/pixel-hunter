import renderElement from './../render-element.js';

class AbstractView {
  get template() {}

  get element() {
    if (this._element) {
      return this._element;
    }

    this._element = this.renderElement();
    this.bind(this._element);

    return this._element;
  }

  render() {
    return renderElement(this.template);
  }

  bind() {}
}

export default AbstractView;
