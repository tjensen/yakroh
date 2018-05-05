import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View
} from 'react-native';
import {CIRCLE, SQUARE, TRIANGLE} from '../shapes';
import Circle from './Circle';
import Square from './Square';
import Triangle from './Triangle';

class Tile extends React.Component {
  _renderShape(tile, tileSize, index) {
    const shapeWidth = tileSize / 4;
    const shapeHeight = tileSize / 4;
    const props = {
      width: shapeWidth,
      height: shapeHeight,
      color: tile.color,
      fill: tile.fill,
      key: index
    };

    switch (tile.shape) {
      case CIRCLE:
        return (
          <Circle {...props} />
        );
      case SQUARE:
        return (
          <Square {...props} />
        );
      case TRIANGLE:
        return (
          <Triangle {...props} />
        );
    }
  }

  render() {
    const tile = this.props.tile;
    const tileSize = Dimensions.get('window').height / 4;
    const top = this.props.position % 3 * tileSize;
    const left = Math.trunc(this.props.position / 3) * tileSize;
    const styles = StyleSheet.create({
      touchableHighlight: {
        position: 'absolute',
        top: top,
        left: left,
        width: tileSize,
        height: tileSize,
        backgroundColor: '#008000',
        alignItems: 'center'
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: tileSize - 8,
        height: tileSize - 8,
        margin: 4,
        backgroundColor: '#FFF',
        borderWidth: this.props.selected ? 5 : 1
      },
      text: {
        color: '#000',
        margin: 5
      }
    });

    if (tile) {
      return (
        <TouchableHighlight
          style={styles.touchableHighlight}
          onPress={this.props.onPress}
        >
          <View testID={'tileContainer'} style={styles.container}>
            {tile.quantity > 0 && this._renderShape(tile, tileSize, 0)}
            {tile.quantity > 1 && this._renderShape(tile, tileSize, 1)}
            {tile.quantity > 2 && this._renderShape(tile, tileSize, 2)}
          </View>
        </TouchableHighlight>
      );
    }
    else {
      return (
        <View style={styles.touchableHighlight} />
      );
    }
  }
}

Tile.propTypes = {
  tile: PropTypes.object,
  position: PropTypes.number.isRequired,
  selected: PropTypes.bool,
  onPress: PropTypes.func
};

export default Tile;
