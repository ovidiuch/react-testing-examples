import React, { Component } from 'react';
import { connect } from 'react-redux';

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

class PureCounter extends Component {
  render() {
    const { count, increment } = this.props;

    return (
      <div>
        Clicked {count} times <button onClick={increment}>+1</button>
      </div>
    );
  }
}

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
