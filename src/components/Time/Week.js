import React from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// 3rd party lib
import moment from 'moment';

// icon
import RaisedButton from 'material-ui/RaisedButton';

import NavRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavLeft from 'material-ui/svg-icons/navigation/chevron-left';

import SwipeableViews from 'react-swipeable-views';

// Service End Points
import api from '../../utils/api';
import auth from '../../routes/auth';

import Day from './Day'

const styles = {
  dropdown: {
    margin: '0px 0px 0px -50px'
  },
  slide: {
    padding: 0,
    minHeight: 300
  },
  button: {
    margin: 20,
  },
  arrow: {
    float: 'right'
  }
};

export default class TableExampleComplex extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tableData: [],
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      value: 1
    };

    moment.locale('en-gb');

    this.week = moment().startOf('week').format('ll') + ' - '+ moment().endOf('week').format('ll')

    this.oneWeekBack = moment().subtract(1, 'week').startOf('week').format('ll') + ' - '+ moment().subtract(1, 'week').endOf('week').format('ll')

    this.twoWeekBack = moment().subtract(2, 'week').startOf('week').format('ll') + ' - '+ moment().subtract(2, 'week').endOf('week').format('ll')

    this.threeWeekBack = moment().subtract(3, 'week').startOf('week').format('ll') + ' - '+ moment().subtract(3, 'week').endOf('week').format('ll')

    this.onRowSelection = this.onRowSelection.bind(this);
    this.breakdown = [];
  }

  componentDidMount = () => {
    console.log('test');
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
        console.log(res);
        const tableData = res.data.result
        this.setState({ tableData, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false })
      });
  }


  // To select other times
  handleSelect = (event, index, value) => this.setState({value});


  handleChangeTabs = (value) => () => {
    console.log(value);
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  onRowSelection = (rows) => {

    this.breakdown = [];
    this.breakdown.push(this.state.tableData[rows]);
    console.log(this.breakdown);
  }

  render() {
    const {
      index,
    } = this.state;

    const tableWeek = (<Table
      height={this.state.height}
      fixedHeader={this.state.fixedHeader}
      fixedFooter={this.state.fixedFooter}
      multiSelectable={this.state.multiSelectable}
      onCellClick={this.handleChangeTabs(1)}
      onRowSelection={this.onRowSelection}
      style={{textAlign:'center'}}
    >
      <TableHeader
        displaySelectAll={this.state.showCheckboxes}
        adjustForCheckbox={this.state.showCheckboxes}
        enableSelectAll={this.state.enableSelectAll}
      >
        <TableRow>
          <TableHeaderColumn colSpan="2">
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
        <TableRow>
          <TableHeaderColumn>Date</TableHeaderColumn>
          <TableHeaderColumn>Normal Time</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={this.state.showCheckboxes}
        deselectOnClickaway={this.state.deselectOnClickaway}
        showRowHover={this.state.showRowHover}
        stripedRows={this.state.stripedRows}
      >
        {this.state.tableData.map( (row, index) => (
          <TableRow key={index} value={index}>
            <TableRowColumn>{moment(row.date).format('ddd, ll')}</TableRowColumn>
            <TableRowColumn>
              <NavRight style={styles.arrow}/>
              {row.total ? row.total : 0}
            </TableRowColumn>
          </TableRow>
          ))}
      </TableBody>
      <TableFooter
        adjustForCheckbox={this.state.showCheckboxes}
      >
        <TableRow>
          <TableRowColumn>Overal</TableRowColumn>
          <TableRowColumn>40 h</TableRowColumn>
        </TableRow>
      </TableFooter>
    </Table>)

    return (
      <div>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide)}>
            {tableWeek}
          </div>
          <div style={Object.assign({}, styles.slide)}>
          <Day breakdown={this.breakdown}/>
          <RaisedButton
            default={true}
            label="Back"
            primary={true}
            icon={<NavLeft />}
            style={styles.button}
            value={0}
            onClick={this.handleChangeTabs(0)}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
