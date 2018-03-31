import {
  startGame,
  shuffle,
  dealTile,
  removeTile,
  selectTile,
  unselectTile,
  requestTiles
} from '../../../app/actions';
import {
  START_GAME,
  SHUFFLE,
  DEAL_TILE,
  REMOVE_TILE,
  SELECT_TILE,
  UNSELECT_TILE,
  REQUEST_TILES
} from '../../../app/actions/types';

describe('startGame', () => {
  it('returns an action', () => {
    expect(startGame()).toEqual({
      type: START_GAME
    });
  });
});

describe('shuffle', () => {
  it('returns an action', () => {
    expect(shuffle()).toEqual({
      type: SHUFFLE
    });
  });
});

describe('dealTile', () => {
  it('returns an action', () => {
    expect(dealTile(7)).toEqual({
      type: DEAL_TILE,
      position: 7
    });
  });
});

describe('removeTile', () => {
  it('returns an action', () => {
    expect(removeTile(3)).toEqual({
      type: REMOVE_TILE,
      position: 3
    });
  });
});

describe('selectTile', () => {
  it('returns an action', () => {
    expect(selectTile(5)).toEqual({
      type: SELECT_TILE,
      position: 5
    });
  });
});

describe('unselectTile', () => {
  it('returns an action', () => {
    expect(unselectTile(11)).toEqual({
      type: UNSELECT_TILE,
      position: 11
    });
  });
});

describe('requestTiles', () => {
  it('returns an action', () => {
    expect(requestTiles()).toEqual({
      type: REQUEST_TILES
    });
  });
});
