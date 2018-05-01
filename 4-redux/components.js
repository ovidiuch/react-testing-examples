import React from 'react';
import { connect } from 'react-redux';

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

const mapDispatchToProps = {
  increment: () => ({ type: 'INCREMENT' })
};

export const ReduxCounter = connect(mapStateToProps, mapDispatchToProps)(
  Counter
);
