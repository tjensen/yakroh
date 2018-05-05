import {combineReducers} from 'redux';
import * as types from '../actions/types';
import {
  RED, BLUE, GREEN,
  SOLID, HALF, CLEAR
} from '../colors';
import {CIRCLE, SQUARE, TRIANGLE} from '../shapes';

function allTiles() {
  let tiles = [];
  [CIRCLE, SQUARE, TRIANGLE].forEach((shape) => {
    [RED, GREEN, BLUE].forEach((color) => {
      [SOLID, HALF, CLEAR].forEach((fill) => {
        [1, 2, 3].forEach((quantity) => {
          tiles.push({shape, color, fill, quantity});
        });
      });
    });
  });
  return tiles;
}

const INITIAL_PLACED_TILES = new Array(12).fill(null);
const INITIAL_PENDING_TILES = allTiles();

function placedTiles(state = INITIAL_PLACED_TILES, action) {
  switch (action.type) {
    case types.SET_PLACED_TILES:
      return action.tiles;
    case types.START_GAME:
      return INITIAL_PLACED_TILES;
    default:
      return state;
  }
}

function selectedTiles(state = [], action) {
  switch (action.type) {
    case types.ADD_SELECTED_TILE:
      return state.concat([action.position]);
    case types.REMOVE_SELECTED_TILE:
      return state.filter((position) => position !== action.position);
    case types.CLEAR_SELECTED_TILES:
    case types.START_GAME:
      return [];
    default:
      return state;
  }
}

function pendingTiles(state = INITIAL_PENDING_TILES, action) {
  switch (action.type) {
    case types.SET_PENDING_TILES:
      return action.tiles;
    case types.REMOVE_PENDING_TILES:
      return state.slice(action.count);
    case types.START_GAME:
      return INITIAL_PENDING_TILES;
    default:
      return state;
  }
}

function removedTiles(state = [], action) {
  switch (action.type) {
    case types.APPEND_REMOVED_TILES:
      return state.concat(action.tiles);
    case types.CLEAR_REMOVED_TILES:
    case types.START_GAME:
      return [];
    default:
      return state;
  }
}

function score(state = 0, action) {
  switch (action.type) {
    case types.INCREMENT_SCORE:
      return state + action.delta;
    case types.START_GAME:
      return 0;
    default:
      return state;
  }
}

function message(state = '', action) {
  switch (action.type) {
    case types.SET_MESSAGE:
      return action.message;
    case types.START_GAME:
      return '';
    default:
      return state;
  }
}

export default combineReducers({
  placedTiles,
  selectedTiles,
  pendingTiles,
  removedTiles,
  score,
  message
});
