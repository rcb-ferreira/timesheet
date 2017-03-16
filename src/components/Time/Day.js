import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

const DayView = ({
  date,
  breakdown
}) => (
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn>{date}</TableHeaderColumn>
        <TableHeaderColumn>&nbsp;</TableHeaderColumn>
      </TableRow>
    </TableHeader>
      <TableBody
      displayRowCheckbox={false}
      stripedRows={true}
      >
      {breakdown.map( (row, index) => (
        <TableRow key={index}>
          <TableRowColumn>{row.name}</TableRowColumn>
          <TableRowColumn>{row.value}</TableRowColumn>
        </TableRow>
      ))}
      </TableBody>
  </Table>
);

DayView.propTypes = {
  dayBreakdown: React.PropTypes.array,
  date: React.PropTypes.string
};

export default DayView;
