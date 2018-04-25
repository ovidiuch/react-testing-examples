import React from 'react';
import { connect } from 'react-redux';

function PureCounter({ count, increment }) {
  return (
    <div>
      Clicked {count} times <button onClick={increment}>+1</button>
    </div>
  );
}

export const ReduxCounter = connect(state => state, {
  increment: () => ({ type: 'INCREMENT' })
})(PureCounter);

export function counterReducer(state = { count: 0 }, { type }) {
  switch (type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
