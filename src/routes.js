import Base from './components/Base';
import Week from './components/Time/Week';
import ClockPage from './containers/Time/ClockPage';
import TimesheetPage from './containers/Time/TimesheetPage';
import NotFoundPage from './containers/Error/NotFoundPage';
import LoginPage from './containers/Login/LoginPage';

import Auth from './routes/auth';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.loggedIn()) {
          callback(null, ClockPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/clock',
      title: 'Clock Time',
      getComponent: (location, callback) => {
        if (Auth.loggedIn()) {
          callback(null, ClockPage);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/timesheet',
      component: TimesheetPage,
      title: 'Day View'
    },

    {
      path: '/timesheet/week',
      component: Week,
      title: 'Week View'
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.logout();

        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '/*',
      component: NotFoundPage
    }
  ]
};

export default routes;
