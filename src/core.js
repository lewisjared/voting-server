import {List, Map} from 'immutable';

export const INTIAL_STATE = Map();

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote.get('pair')) return [];

  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);

  if (aVotes > bVotes) {
    return [a];
  } else if (aVotes < bVotes) {
    return [b];
  } else {
    return [a, b];
  }
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state));
  const id = state.get('id', 0);

  // The last item is the winner
  if (entries.size === 1) {
    // This could also be Map({winner: entries.first()}), but this will allow other unrelated value to be in the state
    return state.remove('entries').remove('pair').remove('tally').set('winner', entries.first())
  } else {
    // Take the first 2 items in the entries as the next two competitors
    return state.remove('tally').merge({
      id: id + 1,
      pair: entries.take(2),
      entries: entries.skip(2)
    });
  }
}

export function vote(state, movie) {
  return state.updateIn(
    ['tally', movie],
    0,
    tally => tally + 1
  );
}