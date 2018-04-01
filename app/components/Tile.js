import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class Tile extends React.Component {
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
        alignItems: 'center',
        width: tileSize - 8,
        height: tileSize - 8,
        margin: 4,
        backgroundColor: '#FFF',
        borderWidth: this.props.selected ? 5 : 1,
      },
      text: {
        color: '#000',
        margin: 5
      }
    });

    return (
      <TouchableHighlight
        style={styles.touchableHighlight}
        onPress={this.props.onPress}
      >
        {tile ? (
          <View testID={'tileContainer'} style={styles.container}>
            <Text style={styles.text}>{tile.color}</Text>
            <Text style={styles.text}>{tile.fill}</Text>
            <Text style={styles.text}>{tile.shape}</Text>
            <Text style={styles.text}>{tile.quantity}</Text>
          </View>
        ) : (
          <View />
        )}
      </TouchableHighlight>
    );
  }
}

export default Tile;
