import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './app/reducers';
import { startGame, shuffle, dealTile } from './app/actions';
import PlayArea from './app/components/PlayArea';

const store = createStore(reducers);

export default class App extends React.Component {
  componentDidMount() {
    store.dispatch(startGame());
    store.dispatch(shuffle());
    for (let i = 0; i < 9; i++) {
      store.dispatch(dealTile(i));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PlayArea />
      </Provider>
    );
  }
}
