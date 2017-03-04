import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Theme
import {lightBlue500, lightBlue600, grey400, grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Routing
import { hashHistory, Router } from 'react-router';
import routes from './routes.js';

// Cutom styles
import './styles/index.css';
import './styles/login.css';
import './styles/timesheet.css';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const muiTheme = getMuiTheme({

  palette: {
    primary1Color: lightBlue500,
    primary2Color: lightBlue600,
    primary3Color: grey400,
    accent1Color: grey900
  }
});

ReactDom.render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={hashHistory} routes={routes} />
  </MuiThemeProvider>), document.getElementById('root'));
