import reducers from '../../../app/reducers';
import {
  setPlacedTiles,
  addSelectedTile,
  removeSelectedTile,
  clearSelectedTiles,
  setPendingTiles,
  removePendingTiles,
  appendRemovedTiles,
  clearRemovedTiles,
  incrementScore,
  setMessage,
  startGame
} from '../../../app/actions';

describe('placedTiles reducer', () => {
  it('returns initial state by default', () => {
    const {placedTiles} = reducers(undefined, {type: 'unimportant'});

    expect(placedTiles).toHaveLength(12);
    expect(Array.from(new Set(placedTiles))).toEqual([null]);
  });

  it('sets placed tiles', () => {
    const state = {placedTiles: []};
    const {placedTiles} = reducers(state, setPlacedTiles(['one', 'two', 'three']));

    expect(placedTiles).toEqual(['one', 'two', 'three']);
  });

  it('starts a new game', () => {
    const state = {placedTiles: []};
    const {placedTiles} = reducers(state, startGame());

    expect(placedTiles).toHaveLength(12);
    expect(Array.from(new Set(placedTiles))).toEqual([null]);
  });
});

describe('selectedTiles reducer', () => {
  it('returns initial state by default', () => {
    const {selectedTiles} = reducers(undefined, {type: 'unimportant'});

    expect(selectedTiles).toEqual([]);
  });

  it('adds a selected tile position', () => {
    const state = {selectedTiles: [0]};
    const {selectedTiles} = reducers(state, addSelectedTile(2));

    expect(selectedTiles).toEqual([0, 2]);
  });

  it('removes a selected tile position', () => {
    const state = {selectedTiles: [0, 2]};
    const {selectedTiles} = reducers(state, removeSelectedTile(0));

    expect(selectedTiles).toEqual([2]);
  });

  it('clears selected tiles', () => {
    const state = {selectedTiles: [5, 1]};
    const {selectedTiles} = reducers(state, clearSelectedTiles());

    expect(selectedTiles).toEqual([]);
  });

  it('starts a new game', () => {
    const state = {selectedTiles: [8, 4]};
    const {selectedTiles} = reducers(state, startGame());

    expect(selectedTiles).toEqual([]);
  });
});

describe('pendingTiles reducer', () => {
  it('returns initial state by default', () => {
    const {pendingTiles} = reducers(undefined, {type: 'unimportant'});

    expect(pendingTiles).toHaveLength(81);
    expect(new Set(pendingTiles).size).toBe(81);
  });

  it('sets pending tiles', () => {
    const state = {pendingTiles: ['foo', 'bar']};
    const {pendingTiles} = reducers(state, setPendingTiles(['one', 'two', 'three']));

    expect(pendingTiles).toEqual(['one', 'two', 'three']);
  });

  it('removes pending tiles', () => {
    const state = {pendingTiles: ['one', 'two', 'three', 'four', 'five']};
    const {pendingTiles} = reducers(state, removePendingTiles(2));

    expect(pendingTiles).toEqual(['three', 'four', 'five']);
  });

  it('starts a new game', () => {
    const state = {pendingTiles: ['one', 'two', 'three', 'four', 'five']};
    const {pendingTiles} = reducers(state, startGame());

    expect(pendingTiles).toHaveLength(81);
    expect(new Set(pendingTiles).size).toBe(81);
  });
});

describe('removedTiles reducer', () => {
  it('returns initial state by default', () => {
    const {removedTiles} = reducers(undefined, {type: 'unimportant'});

    expect(removedTiles).toEqual([]);
  });

  it('appends removed tiles', () => {
    const state = {removedTiles: ['one', 'two']};
    const {removedTiles} = reducers(state, appendRemovedTiles(['three', 'four']));

    expect(removedTiles).toEqual(['one', 'two', 'three', 'four']);
  });

  it('clears removed tiles', () => {
    const state = {removedTiles: ['one', 'two']};
    const {removedTiles} = reducers(state, clearRemovedTiles());

    expect(removedTiles).toEqual([]);
  });

  it('starts a new game', () => {
    const state = {removedTiles: ['one', 'two']};
    const {removedTiles} = reducers(state, startGame());

    expect(removedTiles).toEqual([]);
  });
});

describe('score reducer', () => {
  it('returns initial state by default', () => {
    const {score} = reducers(undefined, {type: 'unimportant'});

    expect(score).toBe(0);
  });

  it('increments score by a delta', () => {
    const state = {score: 42};
    const {score} = reducers(state, incrementScore(5));

    expect(score).toBe(47);
  });

  it('starts a new game', () => {
    const state = {score: 42};
    const {score} = reducers(state, startGame());

    expect(score).toBe(0);
  });
});

describe('message reducer', () => {
  it('returns initial state by default', () => {
    const {message} = reducers(undefined, {type: 'unimportant'});

    expect(message).toBe('');
  });

  it('sets the message', () => {
    const state = {message: ''};
    const {message} = reducers(state, setMessage('a new message'));

    expect(message).toBe('a new message');
  });

  it('starts a new game', () => {
    const state = {message: 'an old message'};
    const {message} = reducers(state, startGame());

    expect(message).toBe('');
  });
});
