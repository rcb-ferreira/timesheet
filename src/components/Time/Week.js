import React from 'react';
import {Card} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

// 3rd party lib
import moment from 'moment';

// Service End Points
import api from '../../utils/api';
import auth from '../../routes/auth';

import Loader from '../Loader';

const styles = {
  row: {
    height: '200px',
    textAlign: 'center'
  }
};

export default class TableDay extends React.Component {

  constructor(props) {
    super(props);

    const maxDate = new Date();

    this.state = {
      tableData: [],
      maxDate: maxDate,
      loading: false,
      fixedHeader: true,
      stripedRows: true,
      value: 1
    };

    moment.locale('en-gb');

    this.week = moment().startOf('week').format('ll') + ' - '+ moment().endOf('week').format('ll')

    this.oneWeekBack = moment().subtract(1, 'week').startOf('week').format('ll') + ' - '+ moment().subtract(1, 'week').endOf('week').format('ll')

    this.twoWeekBack = moment().subtract(2, 'week').startOf('week').format('ll') + ' - '+ moment().subtract(2, 'week').endOf('week').format('ll')

    this.threeWeekBack = moment().subtract(3, 'week').startOf('week').format('ll') + ' - '+ moment().subtract(3, 'week').endOf('week').format('ll')
  }

  componentDidMount = () => {

    this.handleChange('', 0, 1);
  }

  handleChange = (event, index, value) => {
    this.setState({
      value,
      loading: true
    })

    let token = auth.getToken();
    this.setState({loading:true});
    let day = moment().subtract(index, 'week').endOf('week').format("YYYY-MM-DD")
    let range = 7
    let empID = auth.getEmployeeID();
    let contID = auth.getDefaultContractOrderID();

    api.getDay(empID, contID, day, JSON.parse(token), range)
      .then(res => {

        const tableData = res.data.result
        this.setState({ tableData, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false })
      });
  }

  render() {
    const tableHeader = (<Table
        fixedHeader={this.state.fixedHeader}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn colSpan="3">
              <SelectField
                  floatingLabelText="Range"
                  value={this.state.value}
                  fullWidth={true}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText={this.week} />
                  <MenuItem value={2} primaryText={this.oneWeekBack} />
                  <MenuItem value={3} primaryText={this.twoWeekBack} />
                  <MenuItem value={4} primaryText={this.threeWeekBack} />

                </SelectField>
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
      </Table>);

    const tableBody = (<Table
        fixedHeader={this.state.fixedHeader}
      >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn tooltip="Total time worked">Total</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          stripedRows={!this.state.loading}
        >
          {!this.state.loading ? this.state.tableData.map((row, index) =>
            <TableRow key={index}>
                <TableRowColumn>
                {moment(row.date).format('ll')}
                </TableRowColumn>
                <TableRowColumn>
                {row.total}
                </TableRowColumn>
            </TableRow>
          ) : <TableRow>
            <TableRowColumn style={styles.row} colSpan="3">
              <Loader />
            </TableRowColumn>
          </TableRow>}
        </TableBody>
      </Table>);

    return (

      <Card>
        {tableHeader}
        {tableBody}
      </Card>
    );
  }
}
