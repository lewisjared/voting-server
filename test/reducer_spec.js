import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', 'Casablanca']
    });
    const action = {type: 'NEXT'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      id: 1,
      pair: ['Trainspotting', 'Casablanca'],
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      pair: ['Trainspotting', 'Casablanca'],
      entries: []
    });
    const action = {type: 'VOTE', entry: 'Trainspotting'};
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      pair: ['Trainspotting', 'Casablanca'],
      tally: {
        'Trainspotting': 1
      },
      entries: []
    }));
  });

  it('has initial state', () => {
    const action = {type: 'SET_ENTRIES', entries: ['Trainspotting', 'Casablanca']}
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', 'Casablanca']
    }));
  });

  it('handles bad actions', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', 'Casablanca']
    });
    const action = {type: 'NO_MATCHING_ACTION'}
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting', 'Casablanca']
    }));
  });
});