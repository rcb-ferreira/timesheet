import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default class LinearProgressExampleDeterminate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(1), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > 100) {
      this.setState({completed: 100});
    } else {
      this.setState({completed});
      const diff = completed + 1;
      this.timer = setTimeout(() => this.progress(diff), 1000);
    }
  }

  render() {
    return (
      <LinearProgress mode="determinate" value={this.state.completed} />
    );
  }
}
