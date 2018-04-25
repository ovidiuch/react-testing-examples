import React, { Fragment, Component } from 'react';

export class PersistentForm extends Component {
  state = {
    name: 'Guest'
  };

  componentDidMount() {
    this.setState({
      name: localStorage.getItem('name')
    });
  }

  changeName = () => {
    const name = this.refs.nameField.value;

    this.setState({ name }, () => {
      localStorage.setItem('name', name);
    });
  };

  render() {
    const { name } = this.state;

    return (
      <Fragment>
        <p>Welcome, {name}!</p>
        <form onSubmit={this.changeName}>
          <input type="text" ref="nameField" />
          <button type="submit">Change name</button>
        </form>
      </Fragment>
    );
  }
}
