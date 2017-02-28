import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import DatePicker from 'material-ui/DatePicker';

import moment from 'moment';

const styles = {
  cellHeight: {
    height: 70
  }
};

const tableData = [
  {
    date: '20 Feb 2017',
    status: '8h'
  },
  {
    date: '21 Feb 2017',
    status: '8h'
  },
  {
    date: '22 Feb 2017',
    status: '8h'
  },
  {
    date: '23 Feb 2017',
    status: '8h'
  },
  {
    date: '24 Feb 2017',
    status: '5h'
  },
  {
    date: '25 Feb 2017',
    status: '8h'
  },
  {
    date: '26 Feb 2017',
    status: '8h'
  },
  {
    date: '27 Feb 2017',
    status: '8h'
  },
];

export default class TableDay extends React.Component {

  constructor(props) {
    super(props);

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      maxDate: maxDate,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      height: '600px',
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
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">

              <DatePicker
                  className="DatePicker"
                  container="inline"
                  floatingLabelText="From"
                  onChange={this.handleChangeMaxDate}
                  autoOk={this.state.autoOk}
                  defaultDate={this.state.maxDate}
                  formatDate={this.formatDate}
                />

              </TableHeaderColumn>
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">

              <DatePicker
                  className="DatePicker"
                  container="inline"
                  floatingLabelText="To"
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
                  {row.date}
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
