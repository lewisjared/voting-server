import {setEntries, next, vote, INTIAL_STATE} from './core';

export default function reducer(state=INTIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry));
  }
  return state;
}