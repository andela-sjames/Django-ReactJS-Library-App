/* This file sets up a browser-like environment for testing purposes */
import { JSDOM } from 'jsdom';

require.extensions['.css'] = () => (null);
require.extensions['.scss'] = () => (null);
require.extensions['.png'] = () => (null);
require.extensions['.jpg'] = () => (null);

const exposedProperties = ['window', 'navigator', 'document'];

global['document'] = new JSDOM('<html><head></head><body></body></html>');
global['window'] = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global['navigator'] = {
  userAgent: 'node.js',
};

/* Uncomment this if testing code with calls to localForage */
// global['localForage'] = {};
// global['localForage']['getItem'] = key => global['localForage'][key];
// global['localForage']['setItem'] = (key, value) => { global['localForage'][key] = value; };
// global['localForage']['removeItem'] = (key) => { delete global['localForage'][key]; };

const googleUser = {
  getAuthResponse: () => ({
    id_token: 'a_valid_token',
  }),
};

const googleAuth = {
  signOut: () => new Promise((resolve) => {
    resolve(true);
  }),
  currentUser: {
    get: () => (googleUser),
  },
  attachClickHandler: (element: HTMLElement, options: {}, onSuccess: Function, onFailure: Function) => {
    element.addEventListener('click', () => { onSuccess(googleUser); });
  },
};

global['gapi'] = {
  auth2: {
    getAuthInstance: () => (googleAuth),
  },
};

const documentRef = document;
