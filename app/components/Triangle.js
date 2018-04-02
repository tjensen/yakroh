import React from 'react';
import { Svg, Polygon } from 'react-native-svg';
import {
  RED, GREEN, BLUE,
  SOLID, HALF, CLEAR,
  fillColor
} from '../colors';
import { STROKE_WIDTH } from '../shapes';

class Triangle extends React.Component {
  render() {
    const { width, height, color, fill } = this.props;

    return (
      <Svg
        width={width}
        height={height}
        viewBox={'0 0 100 100'}
      >
        <Polygon
          points={'50,5 95,95 5,95'}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill={fillColor(fill, color)}
        />
      </Svg>
    );
  }
}

export default Triangle;
