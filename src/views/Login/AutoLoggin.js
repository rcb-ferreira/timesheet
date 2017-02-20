import React from 'react';
import '../../styles/login.css';

// import auth from '../../utils/auth';

export class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      username: '',
      password: ''
    }

    this.state = {value: ''}
  }

  getInitialState() {

    return { mounted: false };
  }

  componentDidMount() {

    setInterval(function() {

        const { location } = this.props

        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('/time')
        }
        // this.props.router.goBack('time');
    }.bind(this), 3000)

    this.setState({ mounted: true });
  }

  render() {

    return(
      <div className="Login-wrapper">

        {this.state.error && (
          <p>Wrong username or password</p>
        )}
        <div className="Login">
            <p>Loading Page</p>
        </div>
      </div>
    );
  }
}

export default Loading
