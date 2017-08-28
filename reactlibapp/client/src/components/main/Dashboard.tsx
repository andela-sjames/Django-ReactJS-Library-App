import * as React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../actions/authActions';
import { ThunkDispatch } from '../../types';

export interface IDashboardProps {
  compiler: string;
  framework: string;
  stateContainer: string;
}

export interface IConnectedDashboardProps extends IDashboardProps {
  signOut: Function;
}

export class Dashboard extends React.Component<IConnectedDashboardProps> {
  onSignOutClick = (event: any) => {
    event.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <div className="centered-container">
        <h1>This app is under construction</h1>
        <h4>Built with {this.props.compiler}, {this.props.framework} and {this.props.stateContainer}</h4>
        <br />
        <a id="signout-button" className="mui-btn" onClick={this.onSignOutClick}>Sign Out</a>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect<any, any, IDashboardProps>(undefined, mapDispatchToProps)(Dashboard);
