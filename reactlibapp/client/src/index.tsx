/** React/Redux **/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

/** MUI **/
import 'muicss/dist/css/mui.css';
import 'muicss/dist/js/mui.js';
/** Proprietary Styles **/
import './sass/app.scss';
/** Redux Store **/
import store from './store';
/** Main application component **/
import { App } from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App compiler='TypeScript' framework='React' stateContainer='Redux' />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);