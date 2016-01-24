import {setEntries, next, vote, INTIAL_STATE, INTIAL_ROOM_STATE} from './core';

function updateRoom(state, room, roomState) {
  return state.set('changedRoom', room).setIn(['rooms', room], roomState);
}

export default function reducer(state=INTIAL_STATE, action) {
  console.log(action);
  let roomState = state.getIn(['rooms', action.room], INTIAL_ROOM_STATE);

  switch (action.type) {
    case 'SET_ENTRIES':
      return updateRoom(state, action.room, setEntries(roomState, action.entries));
    case 'NEXT':
      return updateRoom(state, action.room, next(roomState));
    case 'VOTE':
      return updateRoom(state, action.room, vote(roomState, action.entry));
  }
  return state;
}