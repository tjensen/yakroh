import {
  startGame,
  shuffle,
  dealTile,
  removeTile,
  selectTile,
  unselectTile,
  requestTiles
} from '../../../app/actions';
import * as types from '../../../app/actions/types';

describe('startGame', () => {
  it('returns an action', () => {
    expect(startGame()).toEqual({
      type: types.START_GAME
    });
  });
});

describe('shuffle', () => {
  it('returns an action', () => {
    expect(shuffle()).toEqual({
      type: types.SHUFFLE
    });
  });
});

describe('dealTile', () => {
  it('returns an action', () => {
    expect(dealTile(7)).toEqual({
      type: types.DEAL_TILE,
      position: 7
    });
  });
});

describe('removeTile', () => {
  it('returns an action', () => {
    expect(removeTile(3)).toEqual({
      type: types.REMOVE_TILE,
      position: 3
    });
  });
});

describe('selectTile', () => {
  it('returns an action', () => {
    expect(selectTile(5)).toEqual({
      type: types.SELECT_TILE,
      position: 5
    });
  });
});

describe('unselectTile', () => {
  it('returns an action', () => {
    expect(unselectTile(11)).toEqual({
      type: types.UNSELECT_TILE,
      position: 11
    });
  });
});

describe('requestTiles', () => {
  it('returns an action', () => {
    expect(requestTiles()).toEqual({
      type: types.REQUEST_TILES
    });
  });
});
