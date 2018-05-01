import React from 'react';
import { connect } from 'react-redux';
import { increment } from './actions';

function Counter({ count, increment }) {
  return (
    <div>
      Clicked {count} times <button onClick={increment}>+1</button>
    </div>
  );
}

function mapStateToProps({ count }) {
  return { count };
}

const mapDispatchToProps = { increment };

export const ReduxCounter = connect(mapStateToProps, mapDispatchToProps)(
  Counter
);
