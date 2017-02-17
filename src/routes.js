import React from 'react';
import { Router, Route, IndexRoute} from 'react-router';

import auth from './utils/auth';

import App from './App';
import Login from './pages/Login/Login';
import Time from './pages/Time/Time';
import NotFound from './pages/Error/NotFound';

function requireAuth(nextState, replace) {
  console.log(auth.loggedIn());
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const Routes = (props) => (
 <Router {...props}>
   <Route path="/" mapMenuTitle="Time" component={App}>
      <IndexRoute component={Time}/>
      <Route path="/login" component={Login}/>
      // <Route path="/time" component={Time} />
      <Route path="*" component={Time} onEnter={requireAuth}/>
   </Route>
 </Router>
);

export default Routes;
