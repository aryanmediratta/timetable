function addTokenToHeader() {
  let token = null;
  if (localStorage.jwtToken) {
    token = localStorage.jwtToken;
  }
  let header = new Headers();
  if (token) {
    header.authorization = token;
  }
  header = { ...header, 'Content-Type': 'application/json' };
  return header;
}

module.exports = {
  get: (url) => fetch(url, {
    headers: addTokenToHeader(),
    method: 'GET',
  }),
  post: (url, data) => fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: addTokenToHeader(),
  }),
  put: (url, data, signal) => fetch(url, {
    body: JSON.stringify(data),
    headers: addTokenToHeader(),
    method: 'PUT',
    signal,
  }),
  rawPost: (url, data) => fetch(url, {
    body: data,
    headers: addTokenToHeader(),
    method: 'POST',
  }),
  constructURL: (baseUrl, queryParams) => {
    let URL = baseUrl;
    const params = Object.keys(queryParams);
    let prefix = '?';
    let first = true;

    params.forEach((param) => {
      prefix = first ? '?' : '&';

      if (queryParams[param]) {
        first = false;
        URL = `${URL}${prefix}${param}=${queryParams[param]}`;
      }
    });
    return URL;
  },

};
