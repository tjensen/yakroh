import React from 'react';
import {
  Dimensions,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import TestRenderer from 'react-test-renderer';
import Tile from '../../../app/components/Tile';
import { RED, SOLID } from '../../../app/colors';
import { CIRCLE, SQUARE, TRIANGLE } from '../../../app/shapes';
import Circle from '../../../app/components/Circle';
import Square from '../../../app/components/Square';
import Triangle from '../../../app/components/Triangle';

const middlewares = [];
const mockStore = createMockStore(middlewares);

describe('A Tile', () => {
  let item;
  let tileSize;
  let expectedShapeWidth;
  let expectedShapeHeight;

  beforeEach(() => {
    item = {
      color: RED,
      fill: SOLID,
      shape: CIRCLE,
      quantity: 1
    };
    tileSize = Dimensions.get('window').height / 4;
    expectedShapeWidth = tileSize / 4;
    expectedShapeHeight = tileSize / 4;
  });

  it('renders one circle correctly', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const circle = renderer.root.findByType(Circle);
    expect(circle.props.width).toBe(expectedShapeWidth);
    expect(circle.props.height).toBe(expectedShapeHeight);
    expect(circle.props.color).toBe(RED);
    expect(circle.props.fill).toBe(SOLID);
  });

  it('renders two squares correctly', () => {
    item.shape = SQUARE;
    item.quantity = 2;
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const squares = renderer.root.findAllByType(Square);
    expect(squares).toHaveLength(2);
    for (let x = 0; x < 2; x++) {
      expect(squares[x].props.width).toBe(expectedShapeWidth);
      expect(squares[x].props.height).toBe(expectedShapeHeight);
      expect(squares[x].props.color).toBe(RED);
      expect(squares[x].props.fill).toBe(SOLID);
    }
  });

  it('renders three triangles correctly', () => {
    item.shape = TRIANGLE;
    item.quantity = 3;
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const triangles = renderer.root.findAllByType(Triangle);
    expect(triangles).toHaveLength(3);
    for (let x = 0; x < 3; x++ ) {
      expect(triangles[x].props.width).toBe(expectedShapeWidth);
      expect(triangles[x].props.height).toBe(expectedShapeHeight);
      expect(triangles[x].props.color).toBe(RED);
      expect(triangles[x].props.fill).toBe(SOLID);
    }
  });

  it('renders correctly when not selected', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item} selected={false}/>
    );
    const tile = renderer.root.findByProps({testID: 'tileContainer'});
    expect(tile.props.style.borderWidth).toBe(1);
  });

  it('renders correctly when selected', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item} selected={true}/>
    );
    const tile = renderer.root.findByProps({testID: 'tileContainer'});
    expect(tile.props.style.borderWidth).toBe(5);
  });

  it('renders correctly when tile is null', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={null}/>
    );
    const nodes = renderer.root.findAllByType(TouchableHighlight);
    expect(nodes).toHaveLength(0);
    const view = renderer.root.findByType(View);
    const style = view.props.style;
    expect(style.top).toBe(0);
    expect(style.left).toBe(0);
    expect(style.width).toBe(tileSize);
    expect(style.height).toBe(tileSize);
  });

  it('renders tile in position 0 at top left', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const node = renderer.root.findByType(TouchableHighlight);
    const style = node.props.style;
    expect(style.top).toBe(0);
    expect(style.left).toBe(0);
    expect(style.width).toBe(tileSize);
    expect(style.height).toBe(tileSize);
  });

  it('renders tile in position 2 at bottom left', () => {
    const renderer = TestRenderer.create(
      <Tile position={2} tile={item}/>
    );
    const node = renderer.root.findByType(TouchableHighlight);
    const style = node.props.style;
    expect(style.top).toBe(tileSize * 2);
    expect(style.left).toBe(0);
    expect(style.width).toBe(tileSize);
    expect(style.height).toBe(tileSize);
  });

  it('renders tile in position 9 at top right', () => {
    const renderer = TestRenderer.create(
      <Tile position={9} tile={item}/>
    );
    const node = renderer.root.findByType(TouchableHighlight);
    const style = node.props.style;
    expect(style.top).toBe(0);
    expect(style.left).toBe(tileSize * 3);
    expect(style.width).toBe(tileSize);
    expect(style.height).toBe(tileSize);
  });

  it('renders tile in position 11 at bottom right', () => {
    const renderer = TestRenderer.create(
      <Tile position={11} tile={item}/>
    );
    const node = renderer.root.findByType(TouchableHighlight);
    const style = node.props.style;
    expect(style.top).toBe(tileSize * 2);
    expect(style.left).toBe(tileSize * 3);
    expect(style.width).toBe(tileSize);
    expect(style.height).toBe(tileSize);
  });

  it('calls onPress prop when pressed', () => {
    const mockFn = jest.fn();
    const renderer = TestRenderer.create(
      <Tile position={5} tile={item} onPress={mockFn}/>
    );
    const node = renderer.root.findByType(TouchableHighlight);
    node.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });
});
