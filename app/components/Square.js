import React from 'react';
import { Svg, Rect } from 'react-native-svg';
import {
  RED, GREEN, BLUE,
  SOLID, HALF, CLEAR,
  fillColor
} from '../colors';

class Square extends React.Component {
  render() {
    const { width, height, color, fill } = this.props;

    return (
      <Svg
        width={width}
        height={height}
        viewBox={'0 0 100 100'}
      >
        <Rect
          x={5}
          y={5}
          width={90}
          height={90}
          stroke={color}
          strokeWidth={2}
          fill={fillColor(fill, color)}
        />
      </Svg>
    );
  }
}

export default Square;
