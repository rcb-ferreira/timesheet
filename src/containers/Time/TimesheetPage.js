import React, { Component } from 'react';
import TableDay from '../../components/Time/Day';
import TableWeek from '../../components/Time/Week';

import {Tabs, Tab} from 'material-ui/Tabs';

class TimesheetPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="Day" value="a" >
          <TableDay />
        </Tab>
        <Tab label="Week" value="b">
          <TableWeek />
        </Tab>
      </Tabs>
    );
  }
}

export default TimesheetPage;
