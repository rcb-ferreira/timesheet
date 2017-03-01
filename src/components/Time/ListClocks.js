import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// 3rd party lib
import moment from 'moment';

const styles = {
  header: {
    fontSize: 16,
    color: '#333'
  }
};

const TableClock = ({
  timesheets
}) => (
    <Table
      fixedHeader={true}
      fixedFooter={true}
    >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn >
            <p style={styles.header}>{moment().format('ddd, MMM DD YYYY')}</p>
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        stripedRows={true}
      >
        {timesheets.map( (row, index) => (
          <TableRow key={index}>
            <TableRowColumn>{row.checkIn ? <h3>IN</h3> : <h3>OUT</h3>}</TableRowColumn>
            <TableRowColumn>{moment(row.eventDate).format('H:mm')}</TableRowColumn>
          </TableRow>
          ))}
      </TableBody>
    </Table>
);

TableClock.propTypes = {
  timesheets: React.PropTypes.array
};

export default TableClock;
