import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', room: 'test', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);
    expect(nextState.getIn(['rooms', 'test'])).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('sets the last changed room', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', room: 'test', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);
    expect(nextState.get('changedRoom')).to.equal('test');
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      rooms: {
        test: {
          entries: ['Trainspotting', 'Casablanca']
        }
      }
    });
    const action = {type: 'NEXT', room: 'test'};
    const nextState = reducer(initialState, action);
    expect(nextState.getIn(['rooms', 'test'])).to.equal(fromJS({
      id: 1,
      pair: ['Trainspotting', 'Casablanca'],
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      rooms: {
        test: {
          pair: ['Trainspotting', 'Casablanca'],
          entries: []
        }
      }
    });
    const action = {type: 'VOTE', room: 'test', entry: 'Trainspotting'};
    const nextState = reducer(initialState, action);
    expect(nextState.getIn(['rooms', 'test'])).to.equal(fromJS({
      pair: ['Trainspotting', 'Casablanca'],
      tally: {
        'Trainspotting': 1
      },
      entries: []
    }));
  });

  it('has initial state', () => {
    const action = {
      type: 'SET_ENTRIES',
      room: 'test',
      entries: ['Trainspotting', 'Casablanca']
    };
    const nextState = reducer(undefined, action);
    expect(nextState.getIn(['rooms', 'test'])).to.equal(fromJS({
      entries: ['Trainspotting', 'Casablanca']
    }));
  });

  it('handles bad actions', () => {
    const initialState = fromJS({
      rooms: {}
    });
    const action = {type: 'NO_MATCHING_ACTION'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      rooms: {}
    }));
  });

  it('doesnt set changedRoom on bad action', () => {
    const initialState = fromJS({
      changedRoom: 'test'
    });
    const action = {type: 'NO_MATCHING_ACTION'};
    const nextState = reducer(initialState, action);
    expect(nextState.get('changedRoom')).to.equal('test');
  });
});