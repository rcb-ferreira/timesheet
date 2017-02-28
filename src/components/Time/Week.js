import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// import moment from 'moment';

const styles = {
  tabColumn: {
    height: '70px',
    textAlign: 'center'
  },
  tableHeader: {
    textAlign: 'center'
  }
};

const tableData = [
  {
    date: '20 Feb 2017',
    status: '8'
  },
  {
    date: '21 Feb 2017',
    status: '8'
  },
  {
    date: '22 Feb 2017',
    status: '8'
  },
  {
    date: '23 Feb 2017',
    status: '8'
  },
  {
    date: '24 Feb 2017',
    status: '5'
  },
  {
    date: '25 Feb 2017',
    status: '8'
  },
  {
    date: '26 Feb 2017',
    status: '8'
  },
  {
    date: '27 Feb 2017',
    status: '8'
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
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">Mon 20 Feb 2017 - Mon 27 Feb 2017
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={this.state.stripedRows}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                <TableRowColumn style={styles.tabColumn}>
                {row.date} &nbsp; {row.status}
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
