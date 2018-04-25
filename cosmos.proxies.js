import { createStore } from 'redux';
import createXhrProxy from 'react-cosmos-xhr-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import { counterReducer } from './shared/components';

export default [
  createXhrProxy(),
  createReduxProxy({
    createStore: mockState => createStore(counterReducer, mockState)
  }),
  createRouterProxy()
];
