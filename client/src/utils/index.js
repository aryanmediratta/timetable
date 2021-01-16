function updateAuthToken () {
    // Not going to send tokens. Update this to take token from the global state.
    const token = null;
    let header = new Headers();
    console.log('KEKW', token);
    if (token) {
        header['authorization'] = token;
    }
    header = { ...header, 'Content-Type': 'application/json' }
    console.log('header',header);
    return header;
}

module.exports = {
    get: (url) => fetch(url, {
        headers: updateAuthToken(),
        method: 'GET',
    }).then(response => response.json()),
    post: (url, data) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: updateAuthToken(),
    }),
    put: (url, data, signal) => fetch(url, {
        body: JSON.stringify(data),
        headers: updateAuthToken(),
        method: 'PUT',
        signal,
    }),
    rawPost: (url, data) => fetch(url, {
        body: data,
        headers: updateAuthToken(),
        method: 'POST',
    }),
    updateAuthToken,

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
