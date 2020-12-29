module.exports = {
    get: (url) => fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    }).then(response => response.json()),
    post: (url, data) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }),
    put: (url, data, signal) => fetch(url, {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        signal,
    }),
    rawPost: (url, data) => fetch(url, {
        body: data,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
    })
}