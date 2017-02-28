import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// import moment from 'moment';

const styles = {
  cellHeight: {
    height: 70
  }
};

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
              <TableHeaderColumn style={styles.tableHeader} tooltip="Clocked date">Total work hours
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            <TableRow>
                <TableRowColumn>
                 300 h
                </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}
