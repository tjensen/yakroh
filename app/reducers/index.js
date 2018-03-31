import { combineReducers } from 'redux';
import {
  START_GAME,
  SHUFFLE,
  DEAL_TILE,
  SELECT_TILE,
  UNSELECT_TILE,
  REQUEST_TILES
} from '../actions/types';

function allTiles() {
  let tiles = [];
  ['CIRCLE', 'SQUARE', 'STAR'].forEach((shape) => {
    ['RED', 'GREEN', 'BLUE'].forEach((color) => {
      [1, 2, 3].forEach((quantity) => {
        tiles.push({shape, color, quantity});
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

function allTheSame(items) {
  const result = (1 === new Set(items).size);
  return result;
}

function allDifferent(items) {
  const result = (items.length === new Set(items).size);
  return result;
}

function yakroh(selectedTiles) {
  const colors = selectedTiles.map((tile) => tile.color);
  const shapes = selectedTiles.map((tile) => tile.shape);
  const quantities = selectedTiles.map((tile) => tile.quantity);

  if (!allTheSame(colors) && !allDifferent(colors)) {
    return false;
  }
  if (!allTheSame(shapes) && !allDifferent(shapes)) {
    return false;
  }
  if (!allTheSame(quantities) && !allDifferent(quantities)) {
    return false;
  }

  return true;
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
          placedTiles[selectedTiles[0]] = pendingTiles.shift();
          placedTiles[selectedTiles[1]] = pendingTiles.shift();
          placedTiles[selectedTiles[2]] = pendingTiles.shift();
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
      return Object.assign({}, state, {
        message: 'Not right now',
        score: state.score - 1
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
