import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// import moment from 'moment';

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

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      height: '600px',
    };
  }

  handleToggle = (event, toggled) => {

  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

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
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">Mon 20 Feb 2017
              </TableHeaderColumn>
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">Mon 27 Feb 2017
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            {tableData.map( (row, index) => (
              <TableRow style={styles.cellHeight}>
                  <TableRowColumn key={index}>
                  {row.date}
                  </TableRowColumn>
                  <TableRowColumn key={index}>
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
