import { createStore } from 'redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import { counterReducer } from './components';

export default [
  createReduxProxy({
    createStore: mockState => createStore(counterReducer, mockState)
  })
];
