import * as React from 'react';
import { connect } from 'react-redux';

import { signIn } from '../../actions/authActions';
import { ThunkDispatch } from '../../types';

export interface AuthPageProps { signIn: Function }

export class AuthPage extends React.Component<AuthPageProps> {
  onClick = (event:any) => {
    event.preventDefault();
    this.props.signIn();
  }

  render() {
    return (
      <div className="centered-container">
        <h2 onClick={this.onClick}>You need to log in to access this app</h2>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:ThunkDispatch) => ({
  signIn: () => dispatch(signIn())
})

export default connect<any, any, object>(undefined, mapDispatchToProps)(AuthPage);
