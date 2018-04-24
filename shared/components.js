import React, { Component } from 'react';

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

  incrementCounter = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        Clicked {this.state.count} times{' '}
        <button onClick={this.incrementCounter}>+1</button>
      </div>
    );
  }
}
