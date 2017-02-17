import React, { Component } from 'react';

import {
  View
} from 'react-native';

import Container from '../../components/Container';
import ToggleSift from '../../components/ToggleSift';

export default class Time extends Component {
  render() {
    return (
      <View>
          <Container>
            <ToggleSift />
          </Container>
      </View>
    )
  }
}
