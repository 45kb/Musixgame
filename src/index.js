/*global document*/
import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import reducers from './reducers';

import App from './jsx/app.jsx';

const store = createStore(reducers)
  , AppEl = React.createElement(App);

ReactDOM.render(
  React.createElement(Provider, {store}, AppEl),
  document.getElementById('root')
);
