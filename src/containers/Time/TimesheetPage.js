import React, { Component } from 'react';
import TableDay from '../../components/Time/Day';
import TableWeek from '../../components/Time/Week';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

class TimesheetPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Day" value={0} />
          <Tab label="Week" value={1} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <TableDay />
          </div>
          <div>
            <TableWeek />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default TimesheetPage;
