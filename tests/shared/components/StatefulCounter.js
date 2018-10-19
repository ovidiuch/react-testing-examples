import React, { Component } from 'react';

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
