import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

const styles = {
  tabColumn: {
    height: '115px',
    textAlign: 'center'
  },
  tableHeader: {
    textAlign: 'center'
  }
};

const tableData = [
  {
    name: 'Start',
    status: '08: 00 am'
  },
  {
    name: 'Break',
    status: '12: 00 pm'
  },
  {
    name: 'End',
    status: '18:00 pm'
  },
  {
    name: 'Normal hours',
    status: '12'
  },
  {
    name: 'Overtime',
    status: '2'
  }
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
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">Fri 24 Feb 2017
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
                {row.name} &nbsp; {row.status}
                </TableRowColumn>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}
