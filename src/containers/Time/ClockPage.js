import React, { Component } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import TableClock from '../../components/Time/ListClocks';

// 3rd party lib
import moment from 'moment';

// utils
import api from '../../utils/api';
import auth from '../../routes/auth';

// Custom button styles
const styles = {
  btnClock: {
    height: '100px',
    position: 'fixed',
    bottom: 0
  },
  btnTitle: {
    color: '#FFF',
    lineHeight: '100px'
  }
};

let timer = 0;

class TableExampleComplex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
      toggle: true,
      disable: false,
      lat: '',
      long: '',
      error: '',
      success: '',
      shifts: []
    }

    this.clockShift = this.clockShift.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
    this.loadClocks = this.loadClocks.bind(this);
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({ lat: position.coords.latitude })
        this.setState({ long: position.coords.longitude })
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    setTimeout(function(){
      this.loadClocks()
    }.bind(this), 1000)
  }

  loadClocks() {

    let token = auth.getToken();

    let day = moment().format("YYYY-MM-DD")

    let empID = auth.getEmployeeID();
    let contID = auth.getDefaultContractOrderID();

    api.getClocks(empID, contID, day, JSON.parse(token))
      .then(res => {

        const clocks = res.data.result
        let clockLength = clocks.length

        this.setState({
          shifts: clocks,
          toggle: clocks[clockLength - 1].ClockType === 'In' ? false : true
        })
      })
      .catch(error => {
        console.log(error)
      });
  }

  clockShift(e) {
    e.preventDefault();

    this.setState({
      toggle: !this.state.toggle
    })

    // Reset timer
    timer = 0;

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
      CheckStartDateTime: moment().format(),
      ClockType: this.state.toggle ? 'In' : 'Out'
    };

    this.state.shifts.push(schedule);
    this.setState({ disable: true});

    // Start clock to disable button
    this.startTimer = setInterval(this.toggleButton, 1000);

    api.setClock(schedule)
      .then(function (response) {

        this.setState({ success: 'Successfully sync to server' })
      })
      .catch(function (error) {

      });
  }

  toggleButton() {

    timer += 1;
    this.setState({ completed: timer * 1.7});

    if (timer > 59) {
      this.setState({ disable: false});
      clearInterval(this.startTimer);
    }
  }

  render() {
    return (
      <Card>
        <TableClock timesheets={this.state.shifts} />

        <RaisedButton style={styles.btnClock} type="submit" fullWidth={true} onClick={this.clockShift} disabled={this.state.disable} primary>

        <LinearProgress mode="determinate" value={this.state.completed} />

        <span style={styles.btnTitle}>CLOCK</span>

        </RaisedButton>

      </Card>
    );
  }
}

export default TableExampleComplex;
