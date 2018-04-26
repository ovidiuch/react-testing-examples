import React from 'react';
import { connect } from 'react-redux';

function PureCounter({ count, increment }) {
  return (
    <div>
      Clicked {count} times <button onClick={increment}>+1</button>
    </div>
  );
}

function increment() {
  return { type: 'INCREMENT' };
}

export const ReduxCounter = connect(state => state, { increment })(PureCounter);

export function counterReducer(state = { count: 0 }, { type }) {
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
