import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../types';

export interface IProtectedProps { isAuthenticated: boolean; className?: string; }

export class Protected extends React.Component<IProtectedProps> {
  render() {
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
}

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect<any, any, { className?: string }>(mapStateToProps)(Protected);
