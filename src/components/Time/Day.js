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
      fixedHeader: true,
      maxDate: maxDate,
      autoOk: true
    };
  }

  componentDidMount = () => {

    let day = '2017-02-28';
    let token = auth.getToken();

    api.getDay(day, JSON.parse(token))
      .then(res => {
        const posts = res.data.result

        this.setState({ posts });
      })
      .catch(error => {
        console.log(error);
      });
  }


  handleChangeMaxDate = (event, date) => {

    this.setState({
      maxDate: date,
    });

    let day = moment(this.state.maxDate).format("YYYY-MM-DD");

    let token = auth.getToken();
    api.getDay(day, JSON.parse(token))
      .then(res => {
        const posts = res.data.result

        this.setState({ posts });
      })
      .catch(error => {
        console.log(error);
      });
  };

  formatDate(date){

    return moment(date).format("ddd, MMM DD YYYY");
  }

  openDatePicker(event){
    event.preventDefault();
    this.refs.dp.openDialog()
  }

  render() {
    return (
      <Card>
        <Table>
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
            {this.state.posts.map((row, index) =>
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
        </Table>
      </Card>
    );
  }
}
