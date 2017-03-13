import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

const Alert = ({
  open,
  message,
  action,
  duration,
  onActionTouchTap
}) => (
  <Snackbar
    open={open}
    message={message}
    action={action}
    autoHideDuration={duration ? duration : 0}
    onActionTouchTap={onActionTouchTap}
    bodyStyle={{ backgroundColor: '#03a9f4', color: 'coral', opacity: 0.7 }}
  />
);

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  onActionTouchTap: PropTypes.func.isRequired,
  duration: PropTypes.number.isRequired
};

export default Alert;
