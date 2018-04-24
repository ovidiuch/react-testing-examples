import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

export const CompWithBtn = ({ onClick }) => (
  <div>
    <button onClick={onClick} />
  </div>
);

export const HelloMessage = ({ name }) => <span>Hello {name}</span>;

export class StatefulCounter extends Component {
  state = {
    count: 0
  };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        Clicked {this.state.count} times{' '}
        <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}

const PureCounter = ({ count, increment }) => {
  return (
    <div>
      Clicked {count} times <button onClick={increment}>+1</button>
    </div>
  );
};

export const ReduxCounter = connect(state => state, {
  increment: () => ({ type: 'INCREMENT' })
})(PureCounter);

export const counterReducer = (state = { count: 0 }, { type }) => {
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

const UserPage = ({ match: { params } }) => {
  return (
    <div>
      User #{params.userId} <Link to="/users/6">Next user</Link>
    </div>
  );
};

export const UserWithRouter = withRouter(UserPage);
