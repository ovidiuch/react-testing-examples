import { createStore } from 'redux';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import { counterReducer } from './shared/components';

export default [
  createReduxProxy({
    createStore: mockState => createStore(counterReducer, mockState)
  }),
  createRouterProxy()
];
