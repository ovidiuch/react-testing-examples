import { createStore } from 'redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import { counterReducer } from './shared/components';

const ReduxProxy = createReduxProxy({
  createStore: mockState => createStore(counterReducer, mockState)
});

export default [ReduxProxy];
