import React, { Component } from 'react';
import {
  View,
  Dimensions
} from 'react-native';

var sWidth = Dimensions.get('window').width; //full width
var sHeight = Dimensions.get('window').height; //full height

class App extends Component {

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: sWidth,
        height: sHeight,
      }}>
        {this.props.children}
      </View>
    )
  }
}

export default App;
