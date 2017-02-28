import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyAwesomeReactComponent from './components/MyAwesomeReactComponent';

import AvatarExampleSimple from './components/Avatar';

class App extends Component {
  constructor() {
    super();
    this._handlePress = this._handlePress.bind(this);
  }

  _handlePress() {
    console.log("Can't touched this?");
  }

  render() {
    return (
      <MuiThemeProvider>
        <MyAwesomeReactComponent />
      </MuiThemeProvider>
    );
  }
}

export default App;
