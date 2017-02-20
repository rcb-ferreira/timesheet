import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css';

import {hashHistory} from 'react-router'
import makeRoutes from './routes'

const routes = makeRoutes()

ReactDOM.render(
  <App history={hashHistory}
      routes={routes} />,
  document.getElementById('root')
);
