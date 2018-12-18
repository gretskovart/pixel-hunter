import dataAdapter from './data-adapter.js';
import constants from './constants.js';

const checkResponse = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => response.json();

export default class Loader {
  static loadData() {
    return fetch(`${constants.LOAD_URL}`)
    .then(checkResponse)
    .then(toJSON)
    .then(dataAdapter);
  }

  static loadResults(name) {
    return fetch(`${constants.SEND_URL}${constants.APP_ID}-${name}`)
      .then(checkResponse)
      .then(toJSON);
  }

  static saveResults(answers, lives, name) {
    const data = Object.assign({}, {answers}, {lives});
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${constants.SEND_URL}${constants.APP_ID}-${name}`, requestSettings)
      .then(checkResponse);
  }
}
