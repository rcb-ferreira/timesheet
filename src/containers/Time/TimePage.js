import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import TableClock from '../../components/Time/ListClocks';

// 3rd party lib
import moment from 'moment';

// utils
import api from '../../utils/api';

// Custom button styles
const styles = {
  btnClock: {
    height: '100px',
    width: '100%',
    position: 'fixed',
    bottom: 0
  },
  btnTitle: {
    color: '#FFF',
    lineHeight: '100px'
  }
};

const data = [];

class TableExampleComplex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      toggle: true,
      disable: false,
      completed: 0,
      lat: '',
      long: '',
      error: '',
      success: '',
      shifts: []
    }

    this.clockShift = this.clockShift.bind(this);
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


    this.setState({
      shifts: data,
      disable: true
    });

    let timer = 0;

    setInterval(function() {
        if (timer > 60) {
          return;
        }

        timer += 1;
        this.setState({
          completed: timer * 1.7
        });

        console.log(timer);
      }.bind(this), 1000)

    setInterval(function() {

        this.setState({
          disable: false
        });
      }.bind(this), 60000)

    api.setClock(schedule)
      .then(function (response) {

        this.setState({ success: 'Successfully sync to server' })
      })
      .catch(function (error) {

      });

    e.preventDefault();
  }

  componentDidMount = () => {
    this.setState({ shifts: data });
  }

  render() {
    return (
      <div>

        <TableClock timesheets={this.state.shifts} />

        <RaisedButton style={styles.btnClock} type="submit" fullWidth={true} onClick={this.clockShift} disabled={this.state.disable} primary>

        <LinearProgress mode="determinate" value={this.state.completed} />

        <span style={styles.btnTitle}>CLOCK</span>

        </RaisedButton>
      </div>
    );
  }
}

export default TableExampleComplex;
