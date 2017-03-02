import React from 'react';
import {Card} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// import moment from 'moment';

// const styles = {
//   cellHeight: {
//     height: 70
//   }
// };

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

    const maxDate = new Date();

    this.state = {
      maxDate: maxDate,
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      value: 1
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Card>
        <Table
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
        >
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>

              <SelectField
                  floatingLabelText="Range"
                  value={this.state.value}
                  fullWidth={true}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText="20 - 27 Feb 2017" />
                  <MenuItem value={2} primaryText="13 - 19 Feb 2017" />
                  <MenuItem value={3} primaryText="6 - 12 Feb 2017" />
                  <MenuItem value={4} primaryText="1 - 5 Feb 2017" />

                </SelectField>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            stripedRows={true}
          >
            {tableData.map( (row, index) => (
              <TableRow key={index}>
                  <TableRowColumn>
                  {row.date}
                  </TableRowColumn>
                  <TableRowColumn>
                  {row.status}
                  </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }
}
