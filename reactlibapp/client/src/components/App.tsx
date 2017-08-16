import * as React from 'react';
import Protected from './auth/Protected';

import { Navbar } from './common/Navbar';
import AuthPage from './auth/AuthPage';
import Dashboard from './main/Dashboard';

export interface AppProps { compiler: string; framework: string; stateContainer: string }

export class App extends React.Component<AppProps> {
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open(
      'GET',
      `https://source.unsplash.com/${screen.width}x${screen.height}/?library,books`,
      true
    );
    xhr.responseType = 'arraybuffer';
    xhr.onload = function setBackgroundPhoto() {
      const arr = new Uint8Array(xhr.response);
      let raw = '';
      arr.forEach((charCode) => {
        raw += String.fromCharCode(charCode);
      });
      const uri = `url(data:image/jpeg;base64,${btoa(raw)})`;

      const background: HTMLElement = document.getElementById('app-background');
      background.style.backgroundImage = uri;
      background.style.backgroundSize = 'cover';
      background.style.backgroundPosition = '50% 50%';
      background.style.backgroundSize = 'fixed';

      let last = new Date().getTime();
      const tick = function() {
        background.style.opacity = (Number(background.style.opacity) + (new Date().getTime() - last) / 1500).toString();
        last = new Date().getTime();

        if (Number(background.style.opacity) < 0.75) {
          (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 60);
        }
      };

      tick();
    };
    xhr.send();
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
