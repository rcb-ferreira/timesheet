import React, { Component } from 'react';
// import {Tabs, Tab} from 'material-ui/Tabs';

// import SwipeableViews from 'react-swipeable-views';

// import TableDay from '../../components/Time/Day';
import TableWeek from '../../components/Time/Week';

// const styles = {
//   slide: {
//     padding: 0,
//     minHeight: 300
//   },
//   tabs: {
//     opacity: '0.8'
//   },
//   tab: {
//     color: '#212121'
//   }
// };

class TimesheetPage extends Component {


  render() {
    return (
      <div>
        <TableWeek />
      </div>
    );
  }
}

export default TimesheetPage;
