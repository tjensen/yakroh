import React from 'react';
import { FlatList } from 'react-native';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import PlayArea from '../../../app/components/PlayArea';
import Tile from '../../../app/components/Tile';
import TestRenderer from 'react-test-renderer';
import { selectTile, unselectTile } from '../../../app/actions';

const middlewares = [];
const mockStore = createMockStore(middlewares);

describe('A PlayArea', () => {
  let renderer;
  let store;

  beforeEach(() => {
    let placedTiles = new Array(12).fill(null);
    for (let i = 0; i < 9; i++) {
      placedTiles[i] = {
        color: 'RGB'[Math.trunc(i / 9) % 3],
        shape: 'OXZ'[Math.trunc(i / 3) % 3],
        quantity: i % 3 + 1,
      };
    }
    store = mockStore({
      placedTiles: placedTiles,
      selectedTiles: [6],
      score: 42,
      message: 'Message to the user'
    });
    renderer = TestRenderer.create(
      <Provider store={store}>
        <PlayArea />
      </Provider>
    );
  });

  it('renders tiles correctly', () => {
    const tiles = renderer.root.findAllByType(Tile);
    expect(tiles).toHaveLength(12);
    expect(tiles[0].props.selected).toBeFalsy();
    expect(tiles[1].props.selected).toBeFalsy();
    expect(tiles[2].props.selected).toBeFalsy();
    expect(tiles[3].props.selected).toBeFalsy();
    expect(tiles[4].props.selected).toBeFalsy();
    expect(tiles[5].props.selected).toBeFalsy();
    expect(tiles[6].props.selected).toBe(true);
    expect(tiles[7].props.selected).toBeFalsy();
    expect(tiles[8].props.selected).toBeFalsy();
    expect(tiles[9].props.selected).toBeFalsy();
    expect(tiles[10].props.selected).toBeFalsy();
    expect(tiles[11].props.selected).toBeFalsy();
  });

  it('renders score correctly', () => {
    const score = renderer.root.findByProps({testID: 'score'});
    expect(score.props.children).toEqual(42);
  });

  it('renders message correctly', () => {
    const message = renderer.root.findByProps({testID: 'message'});
    expect(message.props.children).toEqual('Message to the user');
  });

  it('dispatches SELECT_TILE when tile is pressed', () => {
    const tiles = renderer.root.findAllByType(Tile);
    tiles[5].props.onPress();
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual(selectTile(5));
  });

  it('dispatches UNSELECT_TILE when selected tile is pressed', () => {
    const tiles = renderer.root.findAllByType(Tile);
    tiles[6].props.onPress();
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual(unselectTile(6));
  });

  it('does not dispatch action when empty tile is pressed', () => {
    const tiles = renderer.root.findAllByType(Tile);
    tiles[11].props.onPress();
    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });
});
