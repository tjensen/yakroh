import React from 'react';
import { Button, FlatList } from 'react-native';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import PlayArea from '../../../app/components/PlayArea';
import Tile from '../../../app/components/Tile';
import TestRenderer from 'react-test-renderer';
import * as actions from '../../../app/actions';

const middlewares = [thunk];
const mockStore = createMockStore(middlewares);

function mockAction(name) {
  return jest.spyOn(actions, name).mockImplementation(() => {
    return {type: name};
  });
}

describe('A PlayArea', () => {
  let placedTiles;
  let store;
  let renderer;
  let mockRequestTiles;
  let mockStartGame;
  let mockShuffle;
  let mockDealTile;
  let mockSelectTile;
  let mockUnselectTile;

  beforeEach(() => {
    placedTiles = new Array(12).fill(null);

    mockRequestTiles = mockAction('requestTiles');
    mockStartGame = mockAction('startGame');
    mockShuffle = mockAction('shuffle');
    mockDealTile = mockAction('dealTile');
    mockSelectTile = mockAction('selectTile');
    mockUnselectTile = mockAction('unselectTile');
  });

  afterEach(() => {
    mockRequestTiles.mockRestore();
    mockStartGame.mockRestore();
    mockShuffle.mockRestore();
    mockDealTile.mockRestore();
    mockSelectTile.mockRestore();
    mockUnselectTile.mockRestore();
  });

  describe('with nine placed tiles', () => {
    beforeEach(() => {
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

    it('renders button for requesting more tiles', () => {
      const button = renderer.root.findByProps({testID: 'requestTiles'});
      expect(button.props.title).toBe('Add More Tiles');
      expect(button.props.disabled).toBe(false);
      button.props.onPress();
      expect(mockRequestTiles).toHaveBeenCalledWith();
    });

    it('renders score correctly', () => {
      const score = renderer.root.findByProps({testID: 'score'});
      expect(score.props.children).toEqual(42);
    });

    it('renders message correctly', () => {
      const message = renderer.root.findByProps({testID: 'message'});
      expect(message.props.children).toEqual('Message to the user');
    });

    it('renders button for starting a new game', () => {
      const button = renderer.root.findByProps({testID: 'restart'});
      expect(button.props.title).toBe('Restart');
      button.props.onPress();
      expect(mockStartGame).toHaveBeenCalledWith();
      expect(mockShuffle).toHaveBeenCalledWith();
      expect(mockDealTile).toHaveBeenCalledTimes(9);
      for (let i = 0; i < 9; i++) {
        expect(mockDealTile).toHaveBeenCalledWith(i);
      }
    });

    it('selects tile when tile is pressed', () => {
      const tiles = renderer.root.findAllByType(Tile);
      tiles[5].props.onPress();
      const actions = store.getActions();
      expect(mockSelectTile).toHaveBeenCalledWith(5);
    });

    it('unselects tile when selected tile is pressed', () => {
      const tiles = renderer.root.findAllByType(Tile);
      tiles[6].props.onPress();
      const actions = store.getActions();
      expect(mockUnselectTile).toHaveBeenCalledWith(6);
    });

    it('does not select or unselect tile when empty tile is pressed', () => {
      const tiles = renderer.root.findAllByType(Tile);
      tiles[11].props.onPress();
      expect(mockSelectTile).not.toHaveBeenCalled();
      expect(mockUnselectTile).not.toHaveBeenCalled();
    });
  });

  describe('with 12 placed tiles', () => {
    beforeEach(() => {
      for (let i = 0; i < 12; i++) {
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

    it('disables button for requesting more tiles', () => {
      const button = renderer.root.findByProps({testID: 'requestTiles'});
      expect(button.props.title).toBe('Add More Tiles');
      expect(button.props.disabled).toBe(true);
    });
  });
});
