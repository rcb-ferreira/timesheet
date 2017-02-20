import React from 'react'
import {Route, IndexRoute} from 'react-router'

import auth from '../../utils/auth';
import api from '../../utils/api';

import Login from '../Login/Login'
import Time from '../Time/Time'
import Loading from '../Login/AutoLoggin'
import NotMatch from '../Error/NotFound'

function requireAuth(nextState, replace) {

  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

function getPath(nextState, replace) {

  let query = nextState.location.search
  let index = query.indexOf('=')

  let token = query.substring(index + 2,query.length -1)

  api.getUser(token)
    .then(function (response) {

      localStorage.setItem('session', JSON.stringify(response.data));
      localStorage.setItem('token', JSON.stringify(token));

    })
    .catch(function (error) {

      api.setUser(error)
    });

}

export const makeMainRoutes = () => {
  return (
    <Route path="/">
      <Route path="login" component={Login}/>
      <Route path="time" component={Time} onEnter={requireAuth}/>
      <Route path="loading" component={Loading} onEnter={getPath}/>
      <Route path="*" component={NotMatch} onEnter={requireAuth}/>

      <IndexRoute component={Login} />
    </Route>
  )
}

export default makeMainRoutes
