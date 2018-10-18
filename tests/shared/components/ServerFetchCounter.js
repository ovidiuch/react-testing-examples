/* eslint-env browser */

import React, { Component } from 'react';

export class ServerCounter extends Component {
  state = {
    isSyncing: true,
    count: 0
  };

  componentDidMount() {
    fetch('/count')
      .then(res => res.json())
      .then(({ count }) => {
        this.setState({ isSyncing: false, count });
      });
  }

  increment = () => {
    this.setState({ isSyncing: true });

    fetch('/count', { method: 'POST' })
      .then(res => res.json())
      .then(({ count }) => {
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
