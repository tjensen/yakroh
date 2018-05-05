import React from 'react';
import PropTypes from 'prop-types';
import {Svg, Polygon} from 'react-native-svg';
import {fillColor} from '../colors';
import {STROKE_WIDTH} from '../shapes';

class Triangle extends React.Component {
  render() {
    const {width, height, color, fill} = this.props;

    return (
      <Svg
        width={width}
        height={height}
        viewBox={'0 0 100 100'}>
        <Polygon
          points={'50,5 95,95 5,95'}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill={fillColor(fill, color)} />
      </Svg>
    );
  }
}

Triangle.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  fill: PropTypes.string
};

export default Triangle;
