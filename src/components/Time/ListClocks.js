import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import Place from 'material-ui/svg-icons/maps/place';

// 3rd party lib
import moment from 'moment';

import Loader from '../Loader';

const winHeight = (window.innerHeight - 225).toString() + 'px';

const styles = {
  header: {
    fontSize: 16,
    color: '#333'
  },
  row: {
    height: winHeight,
    textAlign: 'center'
  }
};

const TableClock = ({
  loading,
  timesheets
}) => (
    <Table
      height={winHeight}
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
        stripedRows={timesheets.length > 0 ? true : false}
      >
        {!loading ? timesheets.map( (row, index) => (
          <TableRow key={index}>
            <TableRowColumn><h3>{row.ClockType}</h3></TableRowColumn>
            <TableRowColumn>{moment(row.CheckStartDateTime).format('H:mm')}</TableRowColumn>

            <TableRowColumn><a href={'https://maps.google.com/maps?q='+ row.Latitude +','+ row.Longitude} target="_blank"><Place /></a></TableRowColumn>
          </TableRow>
        )) : <TableRow>
          <TableRowColumn style={styles.row} colSpan="3">
            <Loader />
          </TableRowColumn>
        </TableRow>}
      </TableBody>
    </Table>
);

TableClock.propTypes = {
  loading: React.PropTypes.bool,
  timesheets: React.PropTypes.array
};

export default TableClock;
