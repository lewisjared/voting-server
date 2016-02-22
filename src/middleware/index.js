import thunk from 'redux-thunk';

import action_middleware from './action_middleware'
import logger from './logger'

export default [
  thunk,
  action_middleware,
  logger
];