declare var gapi: any;

/* React/Redux */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/* MUI */
import 'muicss/dist/css/mui.css';
import 'muicss/dist/js/mui.js';
/* Proprietary Styles */
import './sass/app.scss';
/* Redux Store */
import store from './store';
/* Main application component */
import { App } from './components/App';

const startApp = (AppComponent: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppComponent compiler="TypeScript" framework="React" stateContainer="Redux" />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  );
};

gapi.load('auth2', () => {
  gapi.auth2.init({
    client_id: process.env.CLIENT_ID,
    cookiepolicy: 'single_host_origin',
  }).then(() => {
    startApp(App);
  });
});

if (module.hot) {
  module.hot.accept('./components/App', () => { startApp(require('./components/App').App); });
}
