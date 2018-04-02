import reducers from '../../../app/reducers';
import {
  startGame,
  shuffle,
  dealTile,
  removeTile,
  selectTile,
  unselectTile,
  requestTiles
} from '../../../app/actions';

describe('Reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = reducers(undefined, {});
  });

  it('returns initial state', () => {
    expect(initialState.placedTiles).toHaveLength(12);
    expect(initialState.placedTiles.every((e) => e === null)).toBe(true);
    expect(initialState.pendingTiles).toHaveLength(81);
    expect(new Set(initialState.pendingTiles).size).toBe(81);
    expect(initialState.removedTiles).toEqual([]);
    expect(initialState.score).toBe(0);
    expect(initialState.message).toBe('');
  });

  describe('for startGame', () => {
    it('returns initialized state', () => {
      const state = reducers({}, startGame());
      expect(state).toEqual(initialState);
    });
  });

  describe('for shuffle', () => {
    it('returns state with randomized pending tiles', () => {
      const state = reducers(undefined, shuffle());
      expect(state.pendingTiles).toHaveLength(81);
      expect(state.pendingTiles).not.toEqual(initialState.pendingTiles);
      for (tile of initialState.pendingTiles) {
        expect(state.pendingTiles).toContainEqual(tile);
      }
    });
  });

  describe('for dealTile', () => {
    it('moves tile from pendingTiles to position in placedTiles', () => {
      const state = reducers(initialState, dealTile(4));
      expect(state.pendingTiles).toHaveLength(80);
      expect(state.pendingTiles).not.toContainEqual(initialState.pendingTiles[0]);
      expect(state.placedTiles[4]).toEqual(initialState.pendingTiles[0]);
    });
  });

  describe('for selectTile', () => {
    describe('when no tiles have already been selected', () => {
      beforeEach(() => {
        initialState.message = 'a message';
      });

      it('adds position to selectTiles and clears message', () => {
        const state = reducers(initialState, selectTile(2));
        expect(state).toEqual(Object.assign({}, initialState, {
          selectedTiles: [2],
          message: ''
        }));
      });
    });

    describe('when one tile has already been selected', () => {
      beforeEach(() => {
        initialState.selectedTiles = [3];
        initialState.message = 'a message';
      });

      it('adds position to selectedTiles and clears message', () => {
        const state = reducers(initialState, selectTile(2));
        expect(state).toEqual(Object.assign({}, initialState, {
          selectedTiles: [3, 2],
          message: ''
        }));
      });
    });

    describe('when two tiles have already been selected', () => {
      beforeEach(() => {
        initialState.placedTiles[3] = initialState.pendingTiles.shift();
        initialState.placedTiles[5] = initialState.pendingTiles.shift();
        initialState.selectedTiles = [3, 5];
        initialState.message = 'a message';
      });

      describe('and selected tile completes yakroh', () => {
        beforeEach(() => {
          initialState.placedTiles[7] = initialState.pendingTiles.shift();
        });

        it('clears selectedTiles, increases score, clears message, removes selected tiles, and deals new tiles', () => {
          const state = reducers(initialState, selectTile(7));
          const placedTiles = initialState.placedTiles.slice();
          placedTiles[3] = initialState.pendingTiles[0];
          placedTiles[5] = initialState.pendingTiles[1];
          placedTiles[7] = initialState.pendingTiles[2];
          expect(state).toEqual(Object.assign({}, initialState, {
            selectedTiles: [],
            message: 'Yakroh!',
            score: 1,
            removedTiles: [
              initialState.placedTiles[3],
              initialState.placedTiles[5],
              initialState.placedTiles[7]
            ],
            pendingTiles: initialState.pendingTiles.slice(3),
            placedTiles: placedTiles
          }));
        });
      });

      describe('and selected tile does not complete yakroh', () => {
        beforeEach(() => {
          initialState.placedTiles[2] = initialState.pendingTiles.pop();
        });

        it('cleas selectedTiles, decreases score, and sets message', () => {
          const state = reducers(initialState, selectTile(2));
          expect(state).toEqual(Object.assign({}, initialState, {
            selectedTiles: [],
            message: 'Nope',
            score: -1
          }));
        });
      });
    });
  });

  describe('for unselectTile', () => {
    it('removes position from selectedTiles and clears message', () => {
      initialState.selectedTiles = [3, 5];
      initialState.message = 'foo bar';
      const state = reducers(initialState, unselectTile(3));
      expect(state).toEqual(Object.assign({}, initialState, {
        selectedTiles: [5],
        message: ''
      }));
    });
  });

  describe('for requestTiles', () => {
    beforeEach(() => {
      initialState.message = 'something';
    });

    describe('when rightmost column contains no tiles', () => {
      it('places tiles in the rightmost column and clears message', () => {
        const state = reducers(initialState, requestTiles());
        const placedTiles = initialState.placedTiles.slice();
        const pendingTiles = initialState.pendingTiles.slice();
        placedTiles[9] = pendingTiles.shift();
        placedTiles[10] = pendingTiles.shift();
        placedTiles[11] = pendingTiles.shift();
        expect(state).toEqual(Object.assign({}, initialState, {
          placedTiles,
          pendingTiles,
          message: ''
        }));
      });
    });

    describe('when rightmost column contains tiles', () => {
      beforeEach(() => {
        initialState.placedTiles[9] = initialState.pendingTiles.shift();
        initialState.placedTiles[10] = initialState.pendingTiles.shift();
        initialState.placedTiles[11] = initialState.pendingTiles.shift();
      });

      it('clears message', () => {
        const state = reducers(initialState, requestTiles());
        expect(state).toEqual(Object.assign({}, initialState, {
          message: ''
        }));
      });
    });
  });
});
