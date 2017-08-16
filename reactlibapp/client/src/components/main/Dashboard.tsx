import * as React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../actions/authActions';
import { ThunkDispatch } from '../../types';

export interface DashboardProps {
  compiler: string;
  framework: string;
  stateContainer: string;
}

export interface ConnectedDashboardProps extends DashboardProps {
  signOut: Function;
}

export class Dashboard extends React.Component<ConnectedDashboardProps> {
  onClick = (event:any) => {
    event.preventDefault();
    this.props.signOut();
  }

  render() {
    return (
      <div className="centered-container">
        <h1>This app is under construction</h1>
        <h4>Built with {this.props.compiler}, {this.props.framework} and {this.props.stateContainer}</h4>
        <br />
        <h4 onClick={this.onClick}>Sign Out</h4>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:ThunkDispatch) => ({
  signOut: () => dispatch(signOut())
})

export default connect<any, any, DashboardProps>(undefined, mapDispatchToProps)(Dashboard);