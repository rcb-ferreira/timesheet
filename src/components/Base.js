import React, { PropTypes } from 'react';

import Auth from '../routes/auth';
import AppBar from './AppBar';

// Handle the different views
const Base = ({ children, routes, location }) => (
  <div style={{ height: '100%' }}>
    {Auth.loggedIn() ? (

      <AppBar title={routes[1].title} path={location.pathname}/>
     ) : (
       ''
     )}

    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
