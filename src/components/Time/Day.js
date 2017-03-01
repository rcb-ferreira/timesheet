import React from 'react';

import {Card} from 'material-ui/Card';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import DatePicker from 'material-ui/DatePicker';
import DateRange from 'material-ui/svg-icons/action/date-range';
import FloatingActionButton from 'material-ui/FloatingActionButton';

// 3rd party Lib
import moment from 'moment';

// Service End Points
import api from '../../utils/api';
import auth from '../../routes/auth';

import Loader from '../Loader';

const styles = {
  iconStyle: {
    float: 'right'
  }
}

export default class TableDay extends React.Component {

  constructor(props) {
    super(props);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      posts: [],
      maxDate: maxDate,
      fixedHeader: true,
      autoOk: true,
      loading: true
    };

    this.loadDay = this.loadDay.bind(this);
  }

  componentDidMount = () => {

    let day = '2017-02-28';
    this.loadDay(day);
  }


  handleChangeMaxDate = (event, date) => {

    this.setState({
      maxDate: date,
    });

    let day = moment(this.state.maxDate).format("YYYY-MM-DD");

    this.loadDay(day);
  };

  formatDate(date){

    return moment(date).format("ddd, MMM DD YYYY");
  }

  openDatePicker(event){
    event.preventDefault();
    this.refs.dp.openDialog()
  }

  loadDay(day) {

    let token = auth.getToken();
    this.setState({loading:true});

    api.getDay(day, JSON.parse(token))
      .then(res => {

        const posts = res.data.result
        this.setState({ posts, loading: false });

      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const table = (<Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>

          <DatePicker
              ref='dp'
              className="DatePicker"
              container="inline"
              onChange={this.handleChangeMaxDate}
              autoOk={this.state.autoOk}
              defaultDate={this.state.maxDate}
              formatDate={this.formatDate}
            />

          </TableHeaderColumn>

          <TableHeaderColumn>

          <FloatingActionButton style={styles.iconStyle}
          mini={true} onTouchTap={this.openDatePicker.bind(this)}>
            <DateRange />
          </FloatingActionButton>

          </TableHeaderColumn>
        </TableRow>
      </TableHeader>

      { this.state.posts.map((row, index) =>
        <TableBody
          key={index}
          displayRowCheckbox={false}
          stripedRows={true}
        >
          <TableRow >
            <TableRowColumn>
              <h3>Start</h3>
            </TableRowColumn>
            <TableRowColumn>
              <p>{row.start}</p>
            </TableRowColumn>
          </TableRow>

          <TableRow >
            <TableRowColumn>
              <h3>Break</h3>
            </TableRowColumn>
            <TableRowColumn>
              <p>{row.break}</p>
            </TableRowColumn>
          </TableRow>

          <TableRow >
            <TableRowColumn>
              <h3>Finish</h3>
            </TableRowColumn>
            <TableRowColumn>
              <p>{row.finish}</p>
            </TableRowColumn>
          </TableRow>

          <TableRow >
            <TableRowColumn>
              <h3>Total</h3>
            </TableRowColumn>
            <TableRowColumn>
              <p>{row.total}</p>
            </TableRowColumn>
          </TableRow>

        </TableBody>
      )}
    </Table>);

    return (
      <Card className={ this.state.loading ? 'Login' : ''} >
        {
          this.state.loading ?
          <Loader /> : table
        }
      </Card>
    );
  }
}
