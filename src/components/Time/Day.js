import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

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

    this.state = {
      fixedHeader: true,
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
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn tooltip="Select another day">24 Feb 2017</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            {tableData.map( (row, index) => (
              <TableRow style={styles.cellHeight}>
                  <TableRowColumn key={index}>
                  {row.name}
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
