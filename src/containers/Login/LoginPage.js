import React, { Component } from 'react';
import '../../styles/login.css'

import LoginForm from '../../components/LoginForm';
import auth from '../../routes/auth';

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide your username address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

class LoginPage extends Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    // set the initial component state
    this.state = {
      errors: {},
      success: false,
      user: {
        username: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    this.setState({ success: true });

    // create a string for an HTTP body message
    const username = encodeURIComponent(this.state.user.username);
    const password = encodeURIComponent(this.state.user.password);

    let payload = {
      username: username,
      password: password
    };

    const validationResult = validateLoginForm(payload);

    // Do not submit form if any field was not filled in correct
    if (!validationResult.success) {
      this.setState(validationResult)
      return;
    }

    auth.login(payload.username, payload.password, (loggedIn) => {
      const errors = {};

      if (!loggedIn) {
        errors.summary = 'Invalid username or password';
        this.setState({
          success: false,
          errors: errors
        })
      }

      const { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/clock')
      }
    })
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      errors: {},
      success: false,
      user,
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div className="Login">
        <LoginForm className="Modal"
          onSubmit={this.processForm}
          onChange={this.changeUser}
          errors={this.state.errors}
          user={this.state.user}
          visible={this.state.success}
        />
      </div>
    );
  }

}

export default LoginPage;
