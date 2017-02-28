import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

const styles = {
  cellHeight: {
    height: 115
  }
};

const tableData = [
  {
    name: 'Start',
    status: '08:00 am'
  },
  {
    name: 'Break',
    status: '12:00 pm'
  },
  {
    name: 'End',
    status: '18:00 pm'
  },
  {
    name: 'Normal Time',
    status: '12h'
  },
  {
    name: 'Overtime',
    status: '2h'
  }
];

export default class TableDay extends React.Component {

  constructor(props) {
    super(props);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      fixedHeader: true,
      maxDate: maxDate,
      autoOk: true
    };
  }

  handleChangeMaxDate = (event, date) => {

    this.setState({
      maxDate: date,
    });
  };

  formatDate(date){
    return moment(date).format("ddd, MMM DD YYYY");
  }

  render() {
    return (
      <div>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Select another day">

              <DatePicker
                  className="DatePicker"
                  container="inline"
                  onChange={this.handleChangeMaxDate}
                  autoOk={this.state.autoOk}
                  defaultDate={this.state.maxDate}
                  formatDate={this.formatDate}
                />

              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index} style={styles.cellHeight}>
                  <TableRowColumn>
                  {row.name}
                  </TableRowColumn>
                  <TableRowColumn>
                  {row.status}
                  </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
