import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  startGame,
  shuffle,
  dealTile,
  selectTile,
  unselectTile,
  requestTiles
} from '../../../app/actions';
import * as types from '../../../app/actions/types';
import reducers from '../../../app/reducers';

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

describe('startGame', () => {
  it('returns an action to start the game', () => {
    expect(startGame()).toEqual({
      type: types.START_GAME
    });
  });
});

describe('shuffle', () => {
  it('randomizes the pending tiles', () => {
    const state = {pendingTiles: ['one', 'two', 'three', 'four', 'five']};
    const store = mockStore(state);
    store.dispatch(shuffle());

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: types.SET_PENDING_TILES,
        tiles: expect.any(Array)
      }
    ]);
    expect(actions[0].tiles).toHaveLength(5);
    expect(actions[0].tiles).not.toEqual(state.pendingTiles);
    expect(new Set(actions[0].tiles)).toEqual(new Set(state.pendingTiles));
  });
});

describe('dealTile', () => {
  it('removes a tile from the pending tiles and places it', () => {
    const state = {
      placedTiles: [null, null, null, null, null, null, null, null],
      pendingTiles: ['one', 'two', 'three', 'four', 'five']
    };
    const store = mockStore(state);
    store.dispatch(dealTile(3));

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: types.REMOVE_PENDING_TILES,
        count: 1
      },
      {
        type: types.SET_PLACED_TILES,
        tiles: [null, null, null, 'one', null, null, null, null]
      }
    ]);
  });
});

describe('selectTile', () => {
  let state;
  let store;

  beforeEach(() => {
    state = JSON.parse(JSON.stringify(reducers(undefined, {})));
    store = mockStore(state);
  });

  describe('when no tiles have already been selected', () => {
    it('adds position to selected tiles and clears message', () => {
      store.dispatch(selectTile(5));

      expect(store.getActions()).toEqual([
        {
          type: types.ADD_SELECTED_TILE,
          position: 5
        },
        {
          type: types.SET_MESSAGE,
          message: ''
        }
      ]);
    });
  });

  describe('when one tile has already been selected', () => {
    beforeEach(() => {
      state = {
        selectedTiles: [3]
      };
    });

    it('adds position to selected tiles and clears message', () => {
      store.dispatch(selectTile(2));

      expect(store.getActions()).toEqual([
        {
          type: types.ADD_SELECTED_TILE,
          position: 2
        },
        {
          type: types.SET_MESSAGE,
          message: ''
        }
      ]);
    });
  });

  describe('when two tiles have already been selected', () => {
    beforeEach(() => {
      state.selectedTiles = [3, 5];
      state.placedTiles[3] = state.pendingTiles.shift();
      state.placedTiles[5] = state.pendingTiles.shift();
    });

    describe('and selected tile completes yakroh', () => {
      beforeEach(() => {
        state.placedTiles[7] = state.pendingTiles.shift();
        state.placedTiles[0] = state.pendingTiles.shift();
        state.placedTiles[1] = state.pendingTiles.shift();
        state.placedTiles[2] = state.pendingTiles.shift();
        state.placedTiles[4] = state.pendingTiles.shift();
        state.placedTiles[6] = state.pendingTiles.shift();
        state.placedTiles[8] = state.pendingTiles.shift();
      });

      it('clears selected tiles, increases score, sets message, removes selected tiles, and deals new tiles', () => {
        store.dispatch(selectTile(7));

        const expectedPlacedTiles = state.placedTiles.slice();
        expectedPlacedTiles[3] = state.pendingTiles[0];
        expectedPlacedTiles[5] = state.pendingTiles[1];
        expectedPlacedTiles[7] = state.pendingTiles[2];

        expect(store.getActions()).toEqual([
          {
            type: types.CLEAR_SELECTED_TILES
          },
          {
            type: types.INCREMENT_SCORE,
            delta: 1
          },
          {
            type: types.SET_MESSAGE,
            message: 'Yakroh!'
          },
          {
            type: types.APPEND_REMOVED_TILES,
            tiles: [
              state.placedTiles[3],
              state.placedTiles[5],
              state.placedTiles[7]
            ]
          },
          {
            type: types.REMOVE_PENDING_TILES,
            count: 3
          },
          {
            type: types.SET_PLACED_TILES,
            tiles: expectedPlacedTiles
          }
        ]);
      });

      describe('and 12 tiles are placed', () => {
        beforeEach(() => {
          state.selectedTiles = [9, 0];
          state.placedTiles[9] = state.pendingTiles.shift();
          state.placedTiles[0] = state.pendingTiles.shift();
          state.placedTiles[1] = state.pendingTiles.shift();
          state.placedTiles[2] = state.pendingTiles.shift();
          state.placedTiles[4] = state.pendingTiles.shift();
          state.placedTiles[6] = state.pendingTiles.shift();
          state.placedTiles[8] = state.pendingTiles.shift();
          state.placedTiles[10] = state.pendingTiles.shift();
          state.placedTiles[11] = state.pendingTiles.shift();
        });

        it('shifts remaining tiles into first nine positions and does not deal more tiles', () => {
          store.dispatch(selectTile(1));

          const expectedPlacedTiles = state.placedTiles.slice();
          expectedPlacedTiles[0] = state.placedTiles[10];
          expectedPlacedTiles[1] = state.placedTiles[11];
          expectedPlacedTiles[9] = null;
          expectedPlacedTiles[10] = null;
          expectedPlacedTiles[11] = null;

          expect(store.getActions()).toEqual([
            {
              type: types.CLEAR_SELECTED_TILES
            },
            {
              type: types.INCREMENT_SCORE,
              delta: 1
            },
            {
              type: types.SET_MESSAGE,
              message: 'Yakroh!'
            },
            {
              type: types.APPEND_REMOVED_TILES,
              tiles: [
                state.placedTiles[9],
                state.placedTiles[0],
                state.placedTiles[1]
              ]
            },
            {
              type: types.SET_PLACED_TILES,
              tiles: expectedPlacedTiles
            }
          ]);
        });
      });
    });

    describe('and selected tile does not complete yakroh', () => {
      beforeEach(() => {
        state.placedTiles[2] = state.pendingTiles.pop();
      });

      it('clears selected tiles, decreases score, and sets message', () => {
        store.dispatch(selectTile(2));

        expect(store.getActions()).toEqual([
          {
            type: types.CLEAR_SELECTED_TILES
          },
          {
            type: types.INCREMENT_SCORE,
            delta: -1
          },
          {
            type: types.SET_MESSAGE,
            message: 'Nope'
          }
        ]);
      });
    });
  });
});

describe('unselectTile', () => {
  it('removes position from selected tiles and clears message', () => {
    const store = mockStore({});

    store.dispatch(unselectTile(5));

    expect(store.getActions()).toEqual([
      {
        type: types.REMOVE_SELECTED_TILE,
        position: 5
      },
      {
        type: types.SET_MESSAGE,
        message: ''
      }
    ]);
  });
});

describe('requestTiles', () => {
  let state;
  let store;

  beforeEach(() => {
    state = JSON.parse(JSON.stringify(reducers(undefined, {})));
    store = mockStore(state);
  });

  describe('when rightmost column contains no tiles', () => {
    beforeEach(() => {
      for (let position = 0; position < 9; position++) {
        state.placedTiles[position] = state.pendingTiles.shift();
      }
    });

    it('places tiles in the rightmost column and clears message', () => {
      store.dispatch(requestTiles());

      const expectedPlacedTiles = state.placedTiles.slice();
      expectedPlacedTiles[9] = state.pendingTiles[0];
      expectedPlacedTiles[10] = state.pendingTiles[1];
      expectedPlacedTiles[11] = state.pendingTiles[2];

      expect(store.getActions()).toEqual([
        {
          type: types.REMOVE_PENDING_TILES,
          count: 3
        },
        {
          type: types.SET_PLACED_TILES,
          tiles: expectedPlacedTiles
        },
        {
          type: types.SET_MESSAGE,
          message: ''
        }
      ]);
    });
  });

  describe('when rightmost columns contains tiles', () => {
    beforeEach(() => {
      for (let position = 0; position < 12; position++) {
        state.placedTiles[position] = state.pendingTiles.shift();
      }
    });

    it('clears message', () => {
      store.dispatch(requestTiles());

      expect(store.getActions()).toEqual([
        {
          type: types.SET_MESSAGE,
          message: ''
        }
      ]);
    });
  });
});
