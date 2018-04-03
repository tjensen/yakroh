import { combineReducers } from 'redux';
import {
  START_GAME,
  SHUFFLE,
  DEAL_TILE,
  SELECT_TILE,
  UNSELECT_TILE,
  REQUEST_TILES
} from '../actions/types';
import {
  allTheSame,
  allDifferent,
  yakroh
} from '../yakroh';
import {
  RED, BLUE, GREEN,
  SOLID, HALF, CLEAR
} from '../colors';
import { CIRCLE, SQUARE, TRIANGLE } from '../shapes';

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

const initialState = {
  placedTiles: new Array(12).fill(null),
  selectedTiles: [],
  pendingTiles: allTiles(),
  removedTiles: [],
  score: 0,
  message: ''
};

function startGame(state, action) {
  switch (action.type) {
    case START_GAME:
      return initialState;
    default:
      return state;
  }
}

function shuffle(state, action) {
  switch (action.type) {
    case SHUFFLE:
      let copy = state.pendingTiles.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return Object.assign({}, state, {
        pendingTiles: copy
      });
    default:
      return state;
  }
}

function dealTile(state, action) {
  switch (action.type) {
    case DEAL_TILE:
      let placedTiles = state.placedTiles.slice();
      let pendingTiles = state.pendingTiles.slice();
      placedTiles[action.position] = pendingTiles.shift();
      return Object.assign({}, state, {
        pendingTiles: pendingTiles,
        placedTiles: placedTiles
      });
    default:
      return state;
  }
}

function _swapTiles(tiles, pos1, pos2) {
  [tiles[pos1], tiles[pos2]] = [tiles[pos2], tiles[pos1]];
}

function _compactTiles(tiles) {
  let spare = 9;

  for (let spare = 9; spare < 12; spare++) {
    if (tiles[spare] !== null) {
      for (let position = 0; position < 9; position++) {
        if (tiles[position] === null) {
          _swapTiles(tiles, position, spare);
        }
      }
    }
  }
}

function selectTile(state, action) {
  switch (action.type) {
    case SELECT_TILE:
      let selectedTiles = state.selectedTiles.concat(action.position);
      if (selectedTiles.length === 3) {
        if (yakroh(selectedTiles.map((position) => state.placedTiles[position]))) {
          const placedTiles = state.placedTiles.slice();
          const pendingTiles = state.pendingTiles.slice();
          const removedTiles = state.removedTiles.slice();
          removedTiles.push(placedTiles[selectedTiles[0]]);
          removedTiles.push(placedTiles[selectedTiles[1]]);
          removedTiles.push(placedTiles[selectedTiles[2]]);
          placedTiles[selectedTiles[0]] = null;
          placedTiles[selectedTiles[1]] = null;
          placedTiles[selectedTiles[2]] = null;
          _compactTiles(placedTiles);
          for (let position = 0; position < 9; position++) {
            if (placedTiles[position] === null) {
              placedTiles[position] = pendingTiles.shift();
            }
          }
          return Object.assign({}, state, {
            message: 'Yakroh!',
            score: state.score + 1,
            selectedTiles: [],
            placedTiles: placedTiles,
            pendingTiles: pendingTiles,
            removedTiles: removedTiles
          });
        }

        return Object.assign({}, state, {
          message: 'Nope',
          score: state.score - 1,
          selectedTiles: []
        });
      }
      return Object.assign({}, state, {
        selectedTiles,
        message: ''
      });
    default:
      return state;
  }
}

function unselectTile(state, action) {
  switch (action.type) {
    case UNSELECT_TILE:
      let selectedTiles = state.selectedTiles.filter((item) => item != action.position);
      return Object.assign({}, state, {
        selectedTiles,
        message: ''
      });
    default:
      return state;
  }
}

function requestTiles(state, action) {
  switch (action.type) {
    case REQUEST_TILES:
      const placedTiles = state.placedTiles.slice();
      const pendingTiles = state.pendingTiles.slice();
      for (let position = 9; position < 12; position++) {
        if (!placedTiles[position]) {
          placedTiles[position] = pendingTiles.shift();
        }
      }
      return Object.assign({}, state, {
        placedTiles,
        pendingTiles,
        message: ''
      });
    default:
      return state;
  }
}

export default function (state = initialState, action) {
  for (reducer of [startGame, shuffle, dealTile, selectTile, unselectTile, requestTiles]) {
    state = reducer(state, action);
  }
  return state;
};
