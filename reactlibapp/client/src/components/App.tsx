import * as React from 'react';
import Protected from './auth/Protected';

import { Navbar } from './common/Navbar';
import { AuthPage } from './auth/AuthPage';
import Dashboard from './main/Dashboard';

import { lazyLoad, Animate } from '../utils';

export interface AppProps { compiler: string; framework: string; stateContainer: string }

export class App extends React.Component<AppProps> {
  componentDidMount() {
    lazyLoad(`https://source.unsplash.com/${screen.width}x${screen.height}/?library,books`)
      .then((dataURI) => {
        const background: HTMLElement = document.getElementById('app-background');
        background.style.backgroundImage = `url(${dataURI})`;
        background.style.backgroundSize = 'cover';
        background.style.backgroundPosition = '50% 50%';
        background.style.backgroundSize = 'fixed';
  
        Animate.fadeIn('app-background', 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='app'>
        <Navbar />
        <Protected className="main">
          <Dashboard compiler='TypeScript' framework='React' stateContainer='Redux'/>
          <AuthPage />
        </Protected>
      </div>
    );
  }
}
