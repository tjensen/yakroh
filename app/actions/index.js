import {
  START_GAME,
  SHUFFLE,
  DEAL_TILE,
  REMOVE_TILE,
  SELECT_TILE,
  UNSELECT_TILE,
  REQUEST_TILES
} from './types';

export function startGame() {
  return {
    type: START_GAME
  };
}

export function shuffle() {
  return {
    type: SHUFFLE
  };
}

export function dealTile(position) {
  return {
    type: DEAL_TILE,
    position
  };
}

export function removeTile(position) {
  return {
    type: REMOVE_TILE,
    position
  };
}

export function selectTile(position) {
  return {
    type: SELECT_TILE,
    position
  };
}

export function unselectTile(position) {
  return {
    type: UNSELECT_TILE,
    position
  };
}

export function requestTiles() {
  return {
    type: REQUEST_TILES
  };
}
