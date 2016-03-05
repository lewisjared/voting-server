import 'colors'
import omit from 'lodash/omit'


function pp(d) {
  return JSON.stringify(d, null, '  ');
}

/**
 * Logging middleware
 *
 * Logs the action, payload and resultant state
 */
export default store => next => action => {
  console.log('action'.green, action.type.grey);
  console.log('payload'.green, pp(omit(action, 'type')).cyan);
  let result = next(action);
  console.log('next state'.green, pp(store.getState()).blue);
  return result;
}