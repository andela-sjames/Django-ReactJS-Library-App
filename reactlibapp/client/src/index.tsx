import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './sass/app.scss';
import { App } from './components/App';

ReactDOM.render(
  <App compiler='TypeScript' framework='React' />,
  document.getElementById('app')
);