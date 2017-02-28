import api from '../utils/api';

var auth = {
  login(username, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (localStorage.getItem('token')) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }

    pretendRequest(username, pass, (res) => {
      if (res.authenticated) {

        localStorage.setItem('token', JSON.stringify(res.token));
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken() {
    return localStorage.getItem('token')
  },

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('session')
    this.onChange(false)
  },

  loggedIn() {
    return localStorage.getItem('token') !== null;
  },

  onChange() {}
}

module.exports = auth;

function pretendRequest(email, pass, cb) {

  api.login(email, pass)
    .then(function (response) {

      if (response.data.Message) {
        let token = response.data.Message
        cb({
          authenticated: true,
          token: response.data.Message
        })

        api.getUser(token)
          .then(function (response) {

            localStorage.setItem('session', JSON.stringify(response.data));
          })
          .catch(function (error) {

            api.setUser(error)
          })
      }
    })
    .catch(function (error) {
      if (error) {
        cb({
          authenticated: false
        })
      }
    })
}
