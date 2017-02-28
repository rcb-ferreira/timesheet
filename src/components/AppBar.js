import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Divider from 'material-ui/Divider';

// Slide out nav
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// Avatar
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import Logo from '../assets/adcorpCircle.png';

const Logged = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >

    <MenuItem>
      <Link to="/timesheet/day">Day</Link>
    </MenuItem>

    <MenuItem>
      <Link to="/timesheet/week">Week</Link>
    </MenuItem>

    <MenuItem>
      <Link to="/timesheet">Total</Link>
    </MenuItem>

  </IconMenu>
);

const Nothing = (props) => (
  <span>&nbsp;</span>
);

Logged.muiName = 'IconMenu';

class DrawerUndockedExample extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <AppBar
          title={this.props.title}
          iconElementLeft={<IconButton><NavigationMenu /></IconButton>}
          onLeftIconButtonTouchTap={this.handleToggle}

          iconElementRight={ this.props.path.indexOf('/timesheet') ?  <Nothing /> : <Logged />}
        />

        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <ListItem
            primaryText="Adcorp"
            leftAvatar={<Avatar src={Logo} />}
          />
          <Divider />
          <MenuItem onTouchTap={this.handleClose}>
            <Link to="/timesheet">Timesheet</Link>
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            <Link to="/clock">Clock</Link>
          </MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose}>
            <Link to="/logout">Logout</Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default DrawerUndockedExample
