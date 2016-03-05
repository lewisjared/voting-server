import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import middleware from './middleware';


export default function makeStore() {
  return createStore(
    reducer,
    applyMiddleware(...middleware)
  );
}