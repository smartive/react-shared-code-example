import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Page from './container';

const App = () => <Provider store={store}><Page /></Provider>;

ReactDOM.render(<App />, document.getElementById('react-app'));
