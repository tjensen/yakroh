import React from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tile from './Tile';
import * as actions from '../actions';

function mapStateToProps(state) {
  return {
    placedTiles: state.placedTiles,
    selectedTiles: state.selectedTiles,
    score: state.score,
    message: state.message,
    noEmptyPositions: state.placedTiles.every((item) => item !== null)
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

class PlayArea extends React.Component {
  _onPressTile(item, index) {
    if (item) {
      if (this.props.selectedTiles.indexOf(index) === -1) {
        this.props.actions.selectTile(index);
      }
      else {
        this.props.actions.unselectTile(index);
      }
    }
  }

  _renderTile(item, index) {
    let key = `${index}-${JSON.stringify(item)}`;
    return (
      <Tile
        position={index}
        tile={item}
        selected={this.props.selectedTiles.indexOf(index) !== -1}
        key={key}
        onPress={() => this._onPressTile(item, index)}
      />
    );
  }

  _restart() {
    this.props.actions.startGame();
    this.props.actions.shuffle();
    for (let i = 0; i < 9; i++) {
      this.props.actions.dealTile(i);
    }
  }

  render() {
    const tileSize = Dimensions.get('window').height / 4;
    const innerStyle = {
      width: tileSize * 4 + 5,
      height: tileSize * 3 + 5,
      margin: 10
    };

    return (
      <View style={styles.container}>
        <View style={innerStyle}>
          {this.props.placedTiles.map(this._renderTile.bind(this))}
        </View>
        <View style={styles.info}>
          <View style={{flex: 0}}>
            <Button
              testID={'requestTiles'}
              title={'Add More Tiles'}
              onPress={this.props.actions.requestTiles}
              disabled={this.props.noEmptyPositions}
            />
          </View>
          <Text testID={'score'}>{this.props.score}</Text>
          <Text testID={'message'}>{this.props.message}</Text>
          <Button
            testID={'restart'}
            title={'Restart'}
            onPress={this._restart.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#008000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    flex: 1,
    padding: 20
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayArea);
