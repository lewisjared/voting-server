import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });

    it('converts to an immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later')
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          id: 1,
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('adds the winner back into the rotation', () => {
      const state = Map({
        vote: Map({
          id: 1,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: List.of('127 Hours', 'Sunshine', 'Millions')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          id: 2,
          pair: List.of('127 Hours', 'Sunshine')
        }),
        entries: List.of('Millions', 'Trainspotting')
      }));
    });

    it('adds both back in the case of a draw', () => {
      const state = Map({
        vote: Map({
          id: 4,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('127 Hours', 'Sunshine', 'Millions')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          id: 5,
          pair: List.of('127 Hours', 'Sunshine')
        }),
        entries: List.of('Millions', 'Trainspotting', '28 Days Later')
      }));
    });

    it('sets the last entry as the winner', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            'Trainspotting': 3,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = fromJS({
        pair: ['Trainspotting', '28 Days Later']
      });

      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1
        }
      }))
    });

    it('adds to an existing tally', () => {
      const state = fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 3,
          '28 Days Later': 2
        }
      });
      const nextState = vote(state, 'Trainspotting');
      expect(nextState).to.equal(fromJS({
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 4,
          '28 Days Later': 2
        }
      }))
    });
  });
});