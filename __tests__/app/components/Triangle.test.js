import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Svg, Polygon } from 'react-native-svg';
import {
  RED, GREEN, BLUE,
  SOLID, HALF, CLEAR,
  fillColor
} from '../../../app/colors';
import Triangle from '../../../app/components/Triangle';

describe('A Triangle', () => {
  it('renders with red stroke and solid fill correctly', () => {
    const renderer = TestRenderer.create(
      <Triangle width={20} height={30} color={RED} fill={SOLID} />
    );
    const svg = renderer.root.findByType(Svg);
    expect(svg.props.width).toBe(20);
    expect(svg.props.height).toBe(30);
    expect(svg.props.viewBox).toBe('0 0 100 100');
    const polygon = svg.findByType(Polygon);
    expect(polygon.props.points).toBe('50,5 95,95 5,95');
    expect(polygon.props.stroke).toBe(RED);
    expect(polygon.props.strokeWidth).toBe(2);
    expect(polygon.props.fill).toBe(fillColor(SOLID, RED));
  });

  it('renders with green stroke and half fill correctly', () => {
    const renderer = TestRenderer.create(
      <Triangle width={44} height={11} color={GREEN} fill={HALF} />
    );
    const svg = renderer.root.findByType(Svg);
    expect(svg.props.width).toBe(44);
    expect(svg.props.height).toBe(11);
    expect(svg.props.viewBox).toBe('0 0 100 100');
    const polygon = svg.findByType(Polygon);
    expect(polygon.props.points).toBe('50,5 95,95 5,95');
    expect(polygon.props.stroke).toBe(GREEN);
    expect(polygon.props.strokeWidth).toBe(2);
    expect(polygon.props.fill).toBe(fillColor(HALF, GREEN));
  });

  it('renders with blue stroke and clear fill correctly', () => {
    const renderer = TestRenderer.create(
      <Triangle width={500} height={501} color={BLUE} fill={CLEAR} />
    );
    const svg = renderer.root.findByType(Svg);
    expect(svg.props.width).toBe(500);
    expect(svg.props.height).toBe(501);
    expect(svg.props.viewBox).toBe('0 0 100 100');
    const polygon = svg.findByType(Polygon);
    expect(polygon.props.points).toBe('50,5 95,95 5,95');
    expect(polygon.props.stroke).toBe(BLUE);
    expect(polygon.props.strokeWidth).toBe(2);
    expect(polygon.props.fill).toBe(fillColor(CLEAR, BLUE));
  });
});
