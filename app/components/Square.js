import React from 'react';
import PropTypes from 'prop-types';
import {Svg, Rect} from 'react-native-svg';
import {fillColor} from '../colors';
import {STROKE_WIDTH} from '../shapes';

class Square extends React.Component {
  render() {
    const {width, height, color, fill} = this.props;

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
          strokeWidth={STROKE_WIDTH}
          fill={fillColor(fill, color)}
        />
      </Svg>
    );
  }
}

Square.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  fill: PropTypes.string
};

export default Square;
