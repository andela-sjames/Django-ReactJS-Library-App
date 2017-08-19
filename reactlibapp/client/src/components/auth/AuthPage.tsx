import * as React from 'react';

import SignInButton from './SignInButton';

export class AuthPage extends React.Component {
  render() {
    return (
      <div className="centered-container">
        <SignInButton />
      </div>
    );
  }
}
