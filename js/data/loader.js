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
    return fetch(`${constants.SERVER_URL}`)
    .then(checkResponse)
    .then(toJSON)
    .then(dataAdapter);
  }
}
