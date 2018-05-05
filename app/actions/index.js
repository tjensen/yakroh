import * as types from './types';

export function startGame() {
  return {
    type: types.START_GAME
  };
}

export function shuffle() {
  return {
    type: types.SHUFFLE
  };
}

export function dealTile(position) {
  return {
    type: types.DEAL_TILE,
    position
  };
}

export function removeTile(position) {
  return {
    type: types.REMOVE_TILE,
    position
  };
}

export function selectTile(position) {
  return {
    type: types.SELECT_TILE,
    position
  };
}

export function unselectTile(position) {
  return {
    type: types.UNSELECT_TILE,
    position
  };
}

export function requestTiles() {
  return {
    type: types.REQUEST_TILES
  };
}
