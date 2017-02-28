import Base from './components/Base';
import Week from './components/Time/Week';
import Total from './components/Time/Total';
import TimePage from './containers/Time/TimePage';
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
          callback(null, TimePage);
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
          callback(null, TimePage);
        } else {
          callback(null, LoginPage);
        }
      }
    },

    {
      path: '/timesheet/day',
      component: TimesheetPage,
      title: 'Timesheet - Day View'
    },

    {
      path: '/timesheet/week',
      component: Week,
      title: 'Timesheet - Week View'
    },

    {
      path: '/timesheet',
      component: Total,
      title: 'Timesheet - Overview'
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
