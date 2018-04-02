import React from 'react';
import TestRenderer from 'react-test-renderer';
import * as svg from 'react-native-svg';
import {
  RED, GREEN, BLUE,
  SOLID, HALF, CLEAR,
  fillColor
} from '../../../app/colors';
import { STROKE_WIDTH } from '../../../app/shapes';
import Circle from '../../../app/components/Circle';

describe('A Circle', () => {
  it('renders with red stroke and solid fill correctly', () => {
    const renderer = TestRenderer.create(
      <Circle width={20} height={30} color={RED} fill={SOLID} />
    );
    const svgNode = renderer.root.findByType(svg.Svg);
    expect(svgNode.props.width).toBe(20);
    expect(svgNode.props.height).toBe(30);
    expect(svgNode.props.viewBox).toBe('0 0 100 100');
    const svgCircle = svgNode.findByType(svg.Circle);
    expect(svgCircle.props.cx).toBe(50);
    expect(svgCircle.props.cy).toBe(50);
    expect(svgCircle.props.r).toBe(45);
    expect(svgCircle.props.stroke).toBe(RED);
    expect(svgCircle.props.strokeWidth).toBe(STROKE_WIDTH);
    expect(svgCircle.props.fill).toBe(fillColor(SOLID, RED));
  });

  it('renders with green stroke and half fill correctly', () => {
    const renderer = TestRenderer.create(
      <Circle width={44} height={11} color={GREEN} fill={HALF} />
    );
    const svgNode = renderer.root.findByType(svg.Svg);
    expect(svgNode.props.width).toBe(44);
    expect(svgNode.props.height).toBe(11);
    expect(svgNode.props.viewBox).toBe('0 0 100 100');
    const svgCircle = svgNode.findByType(svg.Circle);
    expect(svgCircle.props.cx).toBe(50);
    expect(svgCircle.props.cy).toBe(50);
    expect(svgCircle.props.r).toBe(45);
    expect(svgCircle.props.stroke).toBe(GREEN);
    expect(svgCircle.props.strokeWidth).toBe(STROKE_WIDTH);
    expect(svgCircle.props.fill).toBe(fillColor(HALF, GREEN));
  });

  it('renders with blue stroke and clear fill correctly', () => {
    const renderer = TestRenderer.create(
      <Circle width={500} height={501} color={BLUE} fill={CLEAR} />
    );
    const svgNode = renderer.root.findByType(svg.Svg);
    expect(svgNode.props.width).toBe(500);
    expect(svgNode.props.height).toBe(501);
    expect(svgNode.props.viewBox).toBe('0 0 100 100');
    const svgCircle = svgNode.findByType(svg.Circle);
    expect(svgCircle.props.cx).toBe(50);
    expect(svgCircle.props.cy).toBe(50);
    expect(svgCircle.props.r).toBe(45);
    expect(svgCircle.props.stroke).toBe(BLUE);
    expect(svgCircle.props.strokeWidth).toBe(STROKE_WIDTH);
    expect(svgCircle.props.fill).toBe(fillColor(CLEAR, BLUE));
  });
});
