import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// 3rd party lib
import moment from 'moment';

// icon
import RaisedButton from 'material-ui/RaisedButton';

import NavLeft from 'material-ui/svg-icons/navigation/chevron-left';

import SwipeableViews from 'react-swipeable-views';

// Service End Points
import api from '../../utils/api';
import auth from '../../routes/auth';

import Day from './Day'
import Other from './ListOther'

const styles = {
  dropdown: {
    margin: '0px 0px 0px -50px'
  },
  slide: {
    padding: 0,
    minHeight: 300
  },
  button: {
    zIndex: '1',
    margin: 20
  },
  arrowLeft: {
    margin: '-2px -4px 0px 2px',
  },
  otherLIst: {
    position: 'absolute',
    margin: '-16px 0px 0px -10px'
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
    this.date = moment().format();
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
    let contID = auth.getDefaultContractOrderEmployeeID();

    this.totalNormalTime = 0;
    this.totalOtherTime = 0;
    api.getDay(empID, contID, day, JSON.parse(token), range)
      .then(res => {

        const tableData = res.data.result

        if (tableData.length) {
          tableData.map(async (row, index) => {

            if (row.totals.length) {
              this.otherTime = 0;
              row.totals.map(async row => {

                if (row.name === 'Normal Time') {
                  tableData[index].normalTime = row.value
                  this.totalNormalTime += row.value
                } else if (row.name !== 'Normal Time') {
                  this.otherTime += row.value
                }
              });

              this.totalOtherTime += this.otherTime
              tableData[index].otherTime = this.otherTime
            }
          });
        }

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

    this.setState({
      index: value,
    });
  };

  handleChangeIndex = (index) => {
    this.setState({
      index,
    });
  };

  onRowSelection = (index) => {

    this.breakdown = [];

    if (this.state.tableData[index] && this.state.tableData[index].breakdown) {

      this.date = this.state.tableData[index].date;
      this.breakdown = [
        {
          name: 'Start',
          value: moment(this.state.tableData[index].breakdown.start).format('HH:mm A')
        },
        {
          name: 'Finish',
          value: moment(this.state.tableData[index].breakdown.finish).format('HH:mm A')
        },
        {
          name: 'Break',
          value: this.state.tableData[index].breakdown.break || 0
        }
      ];
    }
  }

  testBtn = (event) => {
    console.log(event);
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
          <TableHeaderColumn colSpan="4">
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
          <TableHeaderColumn colSpan="2">Date</TableHeaderColumn>
          <TableHeaderColumn>Normal Time</TableHeaderColumn>
          <TableHeaderColumn>Other</TableHeaderColumn>
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
            <TableRowColumn colSpan="2">{moment(row.date).format('ddd, ll')}</TableRowColumn>
            <TableRowColumn>
              {row.normalTime}
            </TableRowColumn>
            <TableRowColumn>
              {row.otherTime > 0 ? <span>{row.otherTime} <span style={styles.otherLIst}><Other totals={row.totals}/></span> </span> : 0}
            </TableRowColumn>
          </TableRow>
        ))}

        <TableRow >
          <TableRowColumn colSpan="2">Total</TableRowColumn>
          <TableRowColumn>{this.totalNormalTime}</TableRowColumn>
          <TableRowColumn>{this.totalOtherTime}</TableRowColumn>
        </TableRow>

      </TableBody>
    </Table>)

    return (
      <div>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide)}>
            {tableWeek}
          </div>
          <div style={Object.assign({}, styles.slide)}>

          <Day breakdown={this.breakdown} date={moment(this.date).format('ddd, ll')}/>
          <RaisedButton
            label="Back"
            primary={true}
            icon={<NavLeft style={Object.assign({}, styles.arrowLeft)}/>}
            style={styles.button}
            value={0}
            onClick={this.handleChangeTabs(0)}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}
