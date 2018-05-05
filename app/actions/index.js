import * as types from './types';
import {yakroh} from '../yakroh';

export function setPlacedTiles(tiles) {
  return {
    type: types.SET_PLACED_TILES,
    tiles
  };
}

export function addSelectedTile(position) {
  return {
    type: types.ADD_SELECTED_TILE,
    position
  };
}

export function removeSelectedTile(position) {
  return {
    type: types.REMOVE_SELECTED_TILE,
    position
  };
}

export function clearSelectedTiles() {
  return {
    type: types.CLEAR_SELECTED_TILES
  };
}

export function setPendingTiles(tiles) {
  return {
    type: types.SET_PENDING_TILES,
    tiles
  };
}

export function removePendingTiles(count) {
  return {
    type: types.REMOVE_PENDING_TILES,
    count
  };
}

export function appendRemovedTiles(tiles) {
  return {
    type: types.APPEND_REMOVED_TILES,
    tiles
  };
}

export function clearRemovedTiles() {
  return {
    type: types.CLEAR_REMOVED_TILES
  };
}

export function incrementScore(delta) {
  return {
    type: types.INCREMENT_SCORE,
    delta
  };
}

export function setMessage(message) {
  return {
    type: types.SET_MESSAGE,
    message
  };
}

export function startGame() {
  return {
    type: types.START_GAME
  };
}

export function shuffle() {
  return (dispatch, getState) => {
    const {pendingTiles} = getState();

    let shuffledTiles = pendingTiles.slice();
    for (let i = shuffledTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTiles[i], shuffledTiles[j]] = [shuffledTiles[j], shuffledTiles[i]];
    }

    dispatch(setPendingTiles(shuffledTiles));
  };
}

export function dealTile(position) {
  return (dispatch, getState) => {
    const {placedTiles, pendingTiles} = getState();

    const newPlacedTiles = placedTiles.slice();
    newPlacedTiles[position] = pendingTiles.shift();

    dispatch(removePendingTiles(1));
    dispatch(setPlacedTiles(newPlacedTiles));
  };
}

function _swapTiles(tiles, pos1, pos2) {
  [tiles[pos1], tiles[pos2]] = [tiles[pos2], tiles[pos1]];
}

function _compactTiles(tiles) {
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

export function selectTile(position) {
  return (dispatch, getState) => {
    const {placedTiles, selectedTiles, pendingTiles} = getState();

    if (selectedTiles.length === 2) {
      dispatch(clearSelectedTiles());

      const selectedPositions = selectedTiles.concat([position]);
      if (yakroh(selectedPositions.map((position) => placedTiles[position]))) {
        const removedTiles = [
          placedTiles[selectedPositions[0]],
          placedTiles[selectedPositions[1]],
          placedTiles[selectedPositions[2]]
        ];
        const newPlacedTiles = placedTiles.slice();
        newPlacedTiles[selectedPositions[0]] = null;
        newPlacedTiles[selectedPositions[1]] = null;
        newPlacedTiles[selectedPositions[2]] = null;
        _compactTiles(newPlacedTiles);
        let placedPendingTilesCount = 0;
        for (let position = 0; position < 9; position++) {
          if (newPlacedTiles[position] === null) {
            newPlacedTiles[position] = pendingTiles[placedPendingTilesCount++];
          }
        }
        dispatch(incrementScore(1));
        dispatch(setMessage('Yakroh!'));
        dispatch(appendRemovedTiles(removedTiles));
        if (placedPendingTilesCount > 0) {
          dispatch(removePendingTiles(placedPendingTilesCount));
        }
        dispatch(setPlacedTiles(newPlacedTiles));
      }
      else {
        dispatch(incrementScore(-1));
        dispatch(setMessage('Nope'));
      }
    }
    else {
      dispatch(addSelectedTile(position));
      dispatch(setMessage(''));
    }
  };
}

export function unselectTile(position) {
  return (dispatch) => {
    dispatch(removeSelectedTile(position));
    dispatch(setMessage(''));
  };
}

export function requestTiles() {
  return (dispatch, getState) => {
    const {placedTiles, pendingTiles} = getState();

    const newPlacedTiles = placedTiles.slice();
    let placedPendingTilesCount = 0;

    for (let position = 9; position < 12; position++) {
      if (placedTiles[position] === null) {
        newPlacedTiles[position] = pendingTiles[placedPendingTilesCount++];
      }
    }

    if (placedPendingTilesCount > 0) {
      dispatch(removePendingTiles(placedPendingTilesCount));
      dispatch(setPlacedTiles(newPlacedTiles));
    }

    dispatch(setMessage(''));
  };
}
