let axios = require('axios');

let api = {

  login: function (username, password) {

    let options = {
      baseURL: 'https://elmsinnstaff.adcorp.co.za/api/oauth/generate',
      url: '?client_id=46965',
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      method: 'GET'
    };

    return axios.request(options.url, options);
  },

  getUser: function (token) {

    if (localStorage.user && token) {
      return localStorage.user;
    } else  {
      let bearer = `Bearer ${token}`;

      let options = {
        baseURL: 'https://elmsinnstaff.adcorp.co.za/',
        url: 'api/v1/user',
        headers: {
          'Authorization': bearer
        },
        method: 'GET'
      };

      return axios.request(options.url, options);
    }
  },

  setClock: function (data) {

    let xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <setERSClocks xmlns="http://tempuri.org/">
          <Employee_Pin_Code>${data.employeePinCode}</Employee_Pin_Code>
          <Employee_Export_ID>${data.employeeExportID}</Employee_Export_ID>
          <Employee_Name>${data.employeeName}</Employee_Name>
          <Event_Date>${data.eventDate}</Event_Date>
          <Direction>${data.direction}</Direction>
          <DeviceSN>${data.deviceSN}</DeviceSN>
          <Acc_id>${data.accId}</Acc_id>
          <Latitude>${data.latitude}</Latitude>
          <Longitude>${data.longitude}</Longitude>
          <GUID>${data.guid}</GUID>
        </setERSClocks>
      </soap:Body>
    </soap:Envelope>`;

    let options = {
      baseURL: 'https://elms.adcorp.co.za/',
      url: '/apiservice.asmx?op=setERSClocks',
      headers: {
        'Content-Type': 'text/xml'
      },
      data: xml,
      method: 'POST'
    };

    return axios.request(options.url, options);
  },

  getDay: function (empID, contractID, date, token, range) {

    if (range === undefined) {
      range = 0;
    }

    let bearer = `Bearer ${token}`;

    let options = {
      baseURL: 'https://elmsinnstaff.adcorp.co.za/api/v1/',
      url: `employees/${empID}/contractorders/${contractID}/timesheets?date=${date}&range=${range}&limit=${range}`,
      headers: {
        'Authorization': bearer
      },
      method: 'GET'
    };

    return axios.request(options.url, options);
  },

  getClocks: function (empID, contractID, date, token) {
    let bearer = `Bearer ${token}`;

    let options = {
      baseURL: 'https://elmsinnstaff.adcorp.co.za/api/v1/',
      url: `employees/${empID}/contractorders/${contractID}/clocks?date=${date}`,
      headers: {
        'Authorization': bearer
      },
      method: 'GET'
    };

    return axios.request(options.url, options);
  },

  getContractorders: function (empID, token) {

    let bearer = `Bearer ${token}`;

    let options = {
      baseURL: 'https://elmsinnstaff.adcorp.co.za/api/v1/',
      url: `employees/${empID}/contractorders`,
      headers: {
        'Authorization': bearer
      },
      method: 'GET'
    };

    return axios.request(options.url, options);
  }
}

module.exports = api;
