import React, { Component } from 'react';
// import { browserHistory, Router, Route, Link, withRouter } from 'react-router';

import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';

import Container from '../../components/Container';
import Button from '../../components/Button';

import auth from '../../utils/auth';

var sWidth = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
  scroll: {
      padding: 30,
      width: sWidth,
      flexDirection: 'column'
  },
  label: {
      color: '#0d8898',
      fontSize: 20
  },
  alignRight: {
      alignSelf: 'flex-end'
  },
  textInput: {
      height: 34,
      borderRadius: 5,
      backgroundColor: '#FFF',
      borderColor: '#0f0f0f',
      borderWidth: 1,
      flex: 1,
      fontSize: 13,
      padding: 10,
  },
  transparentButton: {
      marginTop: 30,
      borderColor: '#3B5699',
      borderWidth: 2
  },
  buttonBlueText: {
      fontSize: 20,
      color: '#3B5699'
  },
  buttonBigText: {
      fontSize: 20,
      fontWeight: 'bold'
  },
  inline: {
      flexDirection: 'row'
  },
  buttonWhiteText: {
      fontSize: 20,
      color: '#FFF',
  },
  buttonBlackText: {
      fontSize: 20,
      color: '#595856'
  },
  primaryButton: {
      height: 34,
      borderRadius: 5,
      padding: 10,
      backgroundColor: '#039BE5'
  },
  logo: {
      height: 100,
      width: 100,
      backgroundColor: '#039BE5'
  },
  footer: {
     marginTop: 0
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault()

    const username = this.state.username
    const pass = this.state.password

    auth.login(username, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/time')
      }
    })
  }

  render() {
    return (
        <ScrollView style={styles.scroll}>
          {this.state.error && (
            <Container>
              <p>Bad login information</p>
            </Container>
          )}
          <Container>
              <Button
                  label="Logo"
                  styles={{button: styles.logo, label: styles.buttonWhiteText}} />
          </Container>
          <Container>
              <TextInput
                  onChangeText={(username) => this.setState({username})}
                  style={styles.textInput}
                  placeholder="username"
              />
          </Container>
          <Container>
              <TextInput
                  onChangeText={(password) => this.setState({password})}
                  secureTextEntry={true}
                  style={styles.textInput}
                  placeholder="password"
              />
          </Container>
          <View style={styles.footer}>
              <Container>
                  <Button
                      label="Login"
                      styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                      onPress={this.handleSubmit} />
              </Container>
              <Container>
                  <Button
                      label="Forgot Password?"
                      styles={{label: styles.buttonBlackText}} />
              </Container>
          </View>
        </ScrollView>
    );
  }
}
