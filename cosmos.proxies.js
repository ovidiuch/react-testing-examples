import { createStore } from 'redux';
import createXhrProxy from 'react-cosmos-xhr-proxy';
import createFetchProxy from 'react-cosmos-fetch-proxy';
import createReduxProxy from 'react-cosmos-redux-proxy';
import createRouterProxy from 'react-cosmos-router-proxy';
import { counterReducer } from './4-redux/components';

export default [
  createXhrProxy(),
  createFetchProxy(),
  createReduxProxy({
    createStore: mockState => createStore(counterReducer, mockState)
  }),
  createRouterProxy()
];
