import * as React from 'react';

export interface AppProps { compiler: string; framework: string; stateContainer: string }

export class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <div className='main'>
        <h1>This app is under construction</h1>
        <h4>Built with {this.props.compiler}, {this.props.framework} and {this.props.stateContainer}</h4>
      </div>
    );
  }
}
