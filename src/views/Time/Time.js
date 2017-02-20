import React from 'react';
import '../../styles/timesheet.css';

// 3rd party
import moment from 'moment';

// utils
import api from '../../utils/api';

import {
  StyleSheet
} from 'react-native'

// Components
import Schedule from '../../components/List/Schedule';
import Button from '../../components/Button/Button';

const data = [
  {
    employeeName: 'Timesheet manager',
    checkIn: false
  }
];

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
  }
});

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      lat: '',
      long: '',
      error: '',
      success: '',
      shifts: []
    }

    this.clockShift = this.clockShift.bind(this)
  }

  getInitialState() {
    return { mounted: false };
  }

  componentDidMount() {
    this.setState({ shifts: data });

    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({ lat: position.coords.latitude })
        this.setState({ long: position.coords.longitude })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  clockShift(e) {
    this.setState({toggle: !this.state.toggle})

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
      longitude: this.state.long,
      accId: restoredSession.employeeCode,
      guid: '570eaa48-19fb-4862-b0af-1be3344e7549',
      checkIn: this.state.toggle
    };

    data.push(schedule)

    this.setState({ shifts: data });

    api.setClock(schedule)
      .then(function (response) {

        this.setState({ success: 'Successfully sync to server' })
      })
      .catch(function (error) {

        this.setState({ error: 'error' })
      });

    e.preventDefault();
  }

  render() {

    return(
      <div className="timesheet">

        {this.state.error && (
          <p>{this.state.error}</p>
        )}

        {this.state.success && (
          <p>{this.state.error}</p>
        )}

        <Schedule timesheets={this.state.shifts}/>

        <div className="btn-wrapper">
          <Button
            label="Clock"
            styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
            onPress={this.clockShift} />
        </div>
      </div>
    );
  }
}

export default Login
