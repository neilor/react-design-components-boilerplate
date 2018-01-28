import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '../src/index.scss';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.(ts|tsx)$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

const mockStore = configureStore([]);

const store = mockStore({});

addDecorator(story => <Provider store={store}>{story()}</Provider>);

configure(loadStories, module);
