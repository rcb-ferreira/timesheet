import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// 3rd party lib
import moment from 'moment';

const TableClock = ({
  timesheets
}) => (
    <Table
      height={'600px'}
      fixedHeader={true}
      fixedFooter={true}
    >
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
          <TableHeaderColumn tooltip="The Clocked Time">Time</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={false}
        stripedRows={true}
      >
        {timesheets.map( (row, index) => (
          <TableRow key={index}>
            <TableRowColumn>{row.employeeName}</TableRowColumn>
            <TableRowColumn>{moment(row.eventDate).format('H:mm a')}</TableRowColumn>
          </TableRow>
          ))}
      </TableBody>
    </Table>
);

TableClock.propTypes = {
  timesheets: React.PropTypes.array
};

export default TableClock;
