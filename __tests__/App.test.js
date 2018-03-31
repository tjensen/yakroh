import React from 'react';
import TestRenderer from 'react-test-renderer';
import App from '../App';
import PlayArea from '../app/components/PlayArea';

it('renders correctly', () => {
  const renderer = TestRenderer.create(<App />);
  const playArea = renderer.root.findByType(PlayArea);
  expect(playArea).toBeTruthy();
});
