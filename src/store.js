import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';
import action_middleware from './action_middleware';


export default function makeStore() {
  return createStore(
    reducer,
    applyMiddleware(
      thunk,
      action_middleware
    )
  );
}