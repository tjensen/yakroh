import React from 'react';
import {
  Dimensions,
  Text,
  TouchableHighlight
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

  beforeEach(() => {
    item = {
      color: RED,
      fill: SOLID,
      shape: CIRCLE,
      quantity: 1
    };
    tileSize = Dimensions.get('window').height / 4;
  });

  it('renders circle correctly', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const circle = renderer.root.findByType(Circle);
    expect(circle.props.width).toBe(50);
    expect(circle.props.height).toBe(50);
    expect(circle.props.color).toBe(RED);
    expect(circle.props.fill).toBe(SOLID);
    const text = renderer.root.findByType(Text);
    expect(text.props.children).toEqual(1);
  });

  it('renders square correctly', () => {
    item.shape = SQUARE;
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const square = renderer.root.findByType(Square);
    expect(square.props.width).toBe(50);
    expect(square.props.height).toBe(50);
    expect(square.props.color).toBe(RED);
    expect(square.props.fill).toBe(SOLID);
    const text = renderer.root.findByType(Text);
    expect(text.props.children).toEqual(1);
  });

  it('renders triangle correctly', () => {
    item.shape = TRIANGLE;
    const renderer = TestRenderer.create(
      <Tile position={0} tile={item}/>
    );
    const triangle = renderer.root.findByType(Triangle);
    expect(triangle.props.width).toBe(50);
    expect(triangle.props.height).toBe(50);
    expect(triangle.props.color).toBe(RED);
    expect(triangle.props.fill).toBe(SOLID);
    const text = renderer.root.findByType(Text);
    expect(text.props.children).toEqual(1);
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
    const texts = renderer.root.findAllByType(Text);
    expect(texts).toHaveLength(0);
  });

  it('renders tile in position 0 at top left', () => {
    const renderer = TestRenderer.create(
      <Tile position={0} tile={null}/>
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
      <Tile position={2} tile={null}/>
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
      <Tile position={9} tile={null}/>
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
      <Tile position={11} tile={null}/>
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
      <Tile position={5} tile={null} onPress={mockFn}/>
    );
    const node = renderer.root.findByType(TouchableHighlight);
    node.props.onPress();
    expect(mockFn).toHaveBeenCalled();
  });
});
