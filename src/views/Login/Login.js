import React from 'react';
import '../../styles/login.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import auth from '../../utils/auth';

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      username: '',
      password: ''
    }

    this.state = {value: ''}

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getInitialState() {
    return { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  handleNameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePassChange(e) {
    this.setState({password: e.target.value});
  }

  handleSubmit(e) {
    const uName = this.state.username
    const uPass = this.state.password

    auth.login(uName, uPass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      this.setState({
        mounted: false
      });

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/time')
      }
    })

    e.preventDefault();
  }

  render() {
    var form;

    if(this.state.mounted) {
      form = ( <div className="Modal">
                <form
                  onSubmit={this.handleSubmit}
                  className="ModalForm">
                  <div className="Input">
                    <input
                      id='username'
                      type="text"
                      value={this.state.username}
                      onChange={this.handleNameChange}
                      placeholder="username"
                      autoComplete="false"
                      required
                    />
                    <label htmlFor="username"></label>
                  </div>
                  <div className="Input">
                    <input
                      id='password'
                      type="password"
                      value={this.state.password}
                      onChange={this.handlePassChange}
                      placeholder="password"
                      autoComplete="false"
                      required
                    />
                    <label htmlFor="password"></label>
                  </div>
                  <button>
                    Log in
                  </button>
                </form>
              </div>);
    }

    return(
      <div className="Login-wrapper">

        {this.state.error && (
          <p>Wrong username or password</p>
        )}
        <div className="Login">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {form}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default Login
