import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// 3rd party lib
import moment from 'moment';

const DayView = ({
  breakdown
}) => (
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      enableSelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn>{ breakdown.length ? moment(breakdown[0].date).format('ddd, ll') : 'No date'}</TableHeaderColumn>
        <TableHeaderColumn>&nbsp;</TableHeaderColumn>
      </TableRow>
    </TableHeader>
      {breakdown.map( (row, index) => (
        <TableBody
        key={index}
        displayRowCheckbox={false}
        stripedRows={true}
        >
          <TableRow >
            <TableRowColumn>Start</TableRowColumn>
            <TableRowColumn>{row.start}</TableRowColumn>
          </TableRow>
          <TableRow >
            <TableRowColumn>Break</TableRowColumn>
            <TableRowColumn>{row.break}</TableRowColumn>
          </TableRow>
          <TableRow >
            <TableRowColumn>Finish</TableRowColumn>
            <TableRowColumn>{row.finish}</TableRowColumn>
          </TableRow>
          <TableRow >
            <TableRowColumn>Total</TableRowColumn>
            <TableRowColumn>{row.total}</TableRowColumn>
          </TableRow>
        </TableBody>
        ))}
  </Table>
);

DayView.propTypes = {
  dayBreakdown: React.PropTypes.array
};

export default DayView;
