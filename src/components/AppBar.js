import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import Divider from 'material-ui/Divider';

// Slide out nav
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// Avatar
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';

import Logo from '../assets/adcorpCircle.png';

const styles = {
  lists: {
    color: '#03a9f4'
  }
};

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
            <Link
            style={Object.assign({}, styles.lists)}
            to="/timesheet">Timesheet</Link>
          </MenuItem>
          <MenuItem onTouchTap={this.handleClose}>
            <Link
            style={Object.assign({}, styles.lists)}
            to="/clock">Clock</Link>
          </MenuItem>
          <Divider />
          <MenuItem onTouchTap={this.handleClose}>
            <Link
            style={Object.assign({}, styles.lists)} 
            to="/logout">Logout</Link>
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default DrawerUndockedExample
