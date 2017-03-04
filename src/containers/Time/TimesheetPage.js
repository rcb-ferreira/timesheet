import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TableDay from '../../components/Time/Day';
import TableWeek from '../../components/Time/Week';

const styles = {
  slide: {
    padding: 0
  }
};

class DemoTabs extends Component {
  state = {
    index: 0,
  };

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

  render() {
    const {
      index,
    } = this.state;

    return (
      <div>
        <Tabs value={index}>
          <Tab label="Day" value={0} onClick={this.handleChangeTabs(0)} />
          <Tab label="Week" value={1} onClick={this.handleChangeTabs(1)} />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={this.handleChangeIndex}>
          <div style={Object.assign({}, styles.slide)}>
            <TableDay/>
          </div>
          <div style={Object.assign({}, styles.slide)}>
            <TableWeek />
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default DemoTabs;
