import * as React from 'react';
import { connect } from 'react-redux';
import { IState, ThunkDispatch } from '../../types';

import { Preloader } from '../common/Preloader';
import { signIn } from '../../actions/authActions';

declare var gapi: any;

export interface IProtectedProps {
  className?: string;
  wait?: boolean;
}

export interface IConnectedProtectedProps extends IProtectedProps {
  isAuthenticated: boolean;
  email?: string;
  signIn: Function;
}

export class Protected extends React.Component<IConnectedProtectedProps> {
  componentDidMount() {
    if (this.shouldWait()) {
      const googleAuth = gapi.auth2.getAuthInstance();
      this.props.signIn(googleAuth.currentUser.get());
    }
  }

  shouldWait = () => {
    const { isAuthenticated, email, wait } = this.props;

    return (wait && email && !isAuthenticated);
  }

  renderPreloader = () => {
    return (
      <div className="centered-container">
        <Preloader />
      </div>
    );
  }

  renderChildren = () => {
    const children = React.Children.toArray(this.props.children);

    return (
      <div className={this.props.className}>
        {this.props.isAuthenticated
          ? children[0]
          : children[1] || null
        }
      </div>
    );
  }

  render() {
    if (this.shouldWait()) {
      return this.renderPreloader();
    }

    return this.renderChildren();
  }
}

const mapStateToProps = (state: IState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  email: state.auth.email,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  signIn: (googleUser: any) => dispatch(signIn(googleUser)),
});

export default connect<any, any, IProtectedProps>(mapStateToProps, mapDispatchToProps)(Protected);
