import React, { PropTypes } from 'react';
import { Card } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

import Logo from '../assets/adcorpLogo.jpg';

const hideAutoFillColorStyle = {
  WebkitBoxShadow: '0 0 0 1000px white inset'
};
const hintStyle = { zIndex: '1' };

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  user,
  visible
}) => (
  <Card className="Modal">
    <Paper className="login-logo" zDepth={1} >
      <img alt="Adcorp Logo" className="login-img" src={Logo} />
    </Paper>
    <form action="/" onSubmit={onSubmit}>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="username"
          hintText="username"
          errorText={errors.username}
          onChange={onChange}
          value={user.username}
          inputStyle={hideAutoFillColorStyle}
          hintStyle={hintStyle}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          hintText="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
          inputStyle={hideAutoFillColorStyle}
          hintStyle={hintStyle}
        />
      </div>

      <div className="button-line">
        {
          visible ? (
            <RaisedButton disabled={true} fullWidth={true} primary>
              <CircularProgress style={{padding:5}} color="#FFF" size={25} thickness={2} />
            </RaisedButton>
          ) : (
            <RaisedButton type="submit" label="Log in" fullWidth={true} primary/>
          )
        }
      </div>

    </form>
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  visible: React.PropTypes.bool.isRequired,
};

export default LoginForm;
