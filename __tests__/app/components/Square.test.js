import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Svg, Rect } from 'react-native-svg';
import {
  RED, GREEN, BLUE,
  SOLID, HALF, CLEAR,
  fillColor
} from '../../../app/colors';
import Square from '../../../app/components/Square';

describe('A Square', () => {
  it('renders with red stroke and solid fill correctly', () => {
    const renderer = TestRenderer.create(
      <Square width={20} height={30} color={RED} fill={SOLID} />
    );
    const svg = renderer.root.findByType(Svg);
    expect(svg.props.width).toBe(20);
    expect(svg.props.height).toBe(30);
    expect(svg.props.viewBox).toBe('0 0 100 100');
    const rect = svg.findByType(Rect);
    expect(rect.props.x).toBe(5);
    expect(rect.props.y).toBe(5);
    expect(rect.props.width).toBe(90);
    expect(rect.props.height).toBe(90);
    expect(rect.props.stroke).toBe(RED);
    expect(rect.props.strokeWidth).toBe(2);
    expect(rect.props.fill).toBe(fillColor(SOLID, RED));
  });

  it('renders with green stroke and half fill correctly', () => {
    const renderer = TestRenderer.create(
      <Square width={44} height={11} color={GREEN} fill={HALF} />
    );
    const svg = renderer.root.findByType(Svg);
    expect(svg.props.width).toBe(44);
    expect(svg.props.height).toBe(11);
    expect(svg.props.viewBox).toBe('0 0 100 100');
    const rect = svg.findByType(Rect);
    expect(rect.props.x).toBe(5);
    expect(rect.props.y).toBe(5);
    expect(rect.props.width).toBe(90);
    expect(rect.props.height).toBe(90);
    expect(rect.props.stroke).toBe(GREEN);
    expect(rect.props.strokeWidth).toBe(2);
    expect(rect.props.fill).toBe(fillColor(HALF, GREEN));
  });

  it('renders with blue stroke and clear fill correctly', () => {
    const renderer = TestRenderer.create(
      <Square width={500} height={501} color={BLUE} fill={CLEAR} />
    );
    const svg = renderer.root.findByType(Svg);
    expect(svg.props.width).toBe(500);
    expect(svg.props.height).toBe(501);
    expect(svg.props.viewBox).toBe('0 0 100 100');
    const rect = svg.findByType(Rect);
    expect(rect.props.x).toBe(5);
    expect(rect.props.y).toBe(5);
    expect(rect.props.width).toBe(90);
    expect(rect.props.height).toBe(90);
    expect(rect.props.stroke).toBe(BLUE);
    expect(rect.props.strokeWidth).toBe(2);
    expect(rect.props.fill).toBe(fillColor(CLEAR, BLUE));
  });
});
