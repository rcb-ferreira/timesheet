import React, { Component } from 'react';

import {
  StyleSheet,
  View
} from 'react-native';

import auth from '../../utils/auth';

import Container from '../../components/Container';
import ToggleSift from '../../components/ToggleSift';
import Button from '../../components/Button';

const styles = StyleSheet.create({
  buttonWhiteText: {
      fontSize: 10,
      color: '#FFF',
  },
  primaryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: -30,
    right: -30
  }

});

export default class Time extends Component {
  constructor(props) {
    super(props);

    this.clearSession = this.clearSession.bind(this);
  }

  componentDidMount = () => {

    if (auth.getToken() === undefined) {

      this.props.router.replace('/login')
    }
  }

  clearSession = (event) => {
    event.preventDefault()
    auth.logout(true);

    if (auth.getToken() === undefined) {

      this.props.router.replace('/login')
    }
  }

  render() {
    return (
      <View>
          <Container>
            <ToggleSift />
          </Container>
          <Button
            label="Logout"
            styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
            onPress={this.clearSession} />
      </View>
    )
  }
}
