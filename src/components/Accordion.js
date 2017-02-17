import React, { Component } from 'react';

import {
  View
} from 'react-native';

const styles = {
  active: {
    display: 'inherit'
  },
  inactive: {
    display: 'none'
  }
}
class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };

    this.toggle = this.toggle.bind(this)
  }

  toggle = () => {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    const stateStyle = this.state.active ? styles.active : styles.inactive;
    return (
      <View>
        <a onClick={this.toggle}>
         {this.props.summary}
        </a>
        <p style={stateStyle}>
         {this.props.details}
        </p>
      </View>
    );
  }
}

Accordion.protTypes = {
  summary: React.PropTypes.string.isRequired,
  details: React.PropTypes.string.isRequired
}

export default Accordion
