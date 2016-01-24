import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store';

describe('store', () => {
  it('is a correctly configured redux store', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(fromJS({
      rooms: {}
    }));

    store.dispatch({
      type: 'SET_ENTRIES',
      room: 'test',
      entries: ['Trainspotting', '28 Days Later']
    });
    expect(store.getState()).to.equal(fromJS({
      rooms: {
        test: {
          entries: ['Trainspotting', '28 Days Later']
        }
      },
      changedRoom: 'test'
    }));
  });
});