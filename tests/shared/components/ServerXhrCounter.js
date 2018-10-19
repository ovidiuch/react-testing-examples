import React, { Component } from 'react';
import axios from 'axios';

export class ServerCounter extends Component {
  state = {
    isSyncing: true,
    count: 0
  };

  componentDidMount() {
    axios('/count').then(({ data: { count } }) => {
      this.setState({ isSyncing: false, count });
    });
  }

  increment = () => {
    this.setState({ isSyncing: true });

    axios.post('/count').then(({ data: { count } }) => {
      this.setState({ isSyncing: false, count });
    });
  };

  render() {
    const { isSyncing, count } = this.state;

    return isSyncing ? (
      <div>Syncing...</div>
    ) : (
      <div>
        Clicked {count} times <button onClick={this.increment}>+1</button>
      </div>
    );
  }
}
