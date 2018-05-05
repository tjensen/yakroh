import React from 'react';
import PropTypes from 'prop-types';
import * as svg from 'react-native-svg';
import {fillColor} from '../colors';
import {STROKE_WIDTH} from '../shapes';

class Circle extends React.Component {
  render() {
    const {width, height, color, fill} = this.props;

    return (
      <svg.Svg
        width={width}
        height={height}
        viewBox={'0 0 100 100'}>
        <svg.Circle
          cx={50}
          cy={50}
          r={45}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill={fillColor(fill, color)} />
      </svg.Svg>
    );
  }
}

Circle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  fill: PropTypes.string
};

export default Circle;
