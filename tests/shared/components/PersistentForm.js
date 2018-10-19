/* eslint-env browser */

import React, { Component } from 'react';

export class PersistentForm extends Component {
  state = {
    name: 'Guest'
  };

  componentDidMount() {
    this.setState({
      name: localStorage.getItem('name')
    });
  }

  changeName = e => {
    e.preventDefault();

    const name = this.refs.nameField.value;
    this.setState({ name }, () => {
      localStorage.setItem('name', name);
    });
  };

  render() {
    const { name } = this.state;

    return (
      <>
        <p>Welcome, {name}!</p>
        <form onSubmit={this.changeName}>
          <label htmlFor="name-field">Name</label>
          <input id="name-field" type="text" ref="nameField" />
          <button type="submit">Change name</button>
        </form>
      </>
    );
  }
}
