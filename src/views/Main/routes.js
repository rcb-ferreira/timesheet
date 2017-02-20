import React from 'react'
import {Route, IndexRoute} from 'react-router'

import auth from '../../utils/auth';

import Login from '../Login/Login'
import Time from '../Time/Time'
import NotMatch from '../Error/NotFound'

function requireAuth(nextState, replace) {

  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export const makeMainRoutes = () => {
  return (
    <Route path="/">
      <Route path="login" component={Login}/>
      <Route path="time" component={Time} onEnter={requireAuth}/>
      <Route path="*" component={NotMatch} onEnter={requireAuth}/>

      <IndexRoute component={Login} />
    </Route>
  )
}

export default makeMainRoutes
