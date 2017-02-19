import React, { Component } from 'react';
import moment from 'moment';

import {
  StyleSheet,
  View,
} from 'react-native';

import api from '../utils/api';
import Button from './Button';
import Timesheet from './ListTime';

const styles = StyleSheet.create({
  buttonWhiteText: {
      fontSize: 20,
      color: '#FFF',
  },
  primaryButton: {
      height: 100,
      width: 100,
      borderRadius: 100,
      padding: 35,
      backgroundColor: '#039BE5'
  },
  footer: {
     marginTop: 0
  }
});

class ToggleSift extends Component {

  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      dateTimestamp : Date.now(),
      lat: '',
      long: '',
      shifts: [],
      error: false
    };

    // This binding is necessary to make `this` work in the callback
    this.endSift = this.endSift.bind(this);
    this.clockShift = this.clockShift.bind(this);
    this.tick = this.tick.bind(this);
  }

  endSift = () => this.setState(prevState => ({
    toggleEnd: !prevState.toggleEnd
  }));

  clockShift = () => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({ lat: position.coords.latitude })
        this.setState({ lon: position.coords.longitude })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.setState({
      toggle: !this.state.toggle
    });

    let toggle = this.state.toggle ? 'I' : 'O';
    let restoredSession = JSON.parse(localStorage.getItem('session'));

    let schedule = {
      employeePinCode: restoredSession.employeeCode,
      employeeExportID: restoredSession.employeeCode,
      employeeName: restoredSession.firstname + ' ' + restoredSession.surname,
      eventDate: moment().format(),
      direction: toggle,
      deviceSN: 'MOBILEAPP',
      latitude: this.state.lat,
      longitude: this.state.lat,
      accId: restoredSession.employeeCode,
      guid: '570eaa48-19fb-4862-b0af-1be3344e7549'
    };

    this.state.shifts.push(JSON.stringify(schedule));

    this.setState({
      shifts: this.state.shifts
    });

    api.setClock(schedule);
  }

  tick = () => this.setState({
    dateTimestamp: moment().format('H:mm a')
  });

  componentDidMount = () => this.interval = setInterval(this.tick, 1000);

  componentWillUnmount = () => clearInterval(this.interval);

  render() {
    return (
      <View>
        <Timesheet styles={this.listView} list={this.state.shifts}/>
        <Button
            label="Clock"
            styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
            onPress={this.clockShift} />
      </View>
    );
  }
}

export default ToggleSift;
