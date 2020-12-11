"use strict";

var express = require('express');

var path = require('path');

var app = express(); // a test route to make sure we can reach the backend

app.get('/test', function (req, res) {
  res.send('Welcome to the backend!');
}); //Set the port that you want the server to run on

var port = process.env.PORT || 3000;
app.listen(port);
console.log('App is listening on port ' + port);