const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { backendPort, uri, connectionParams } = require('./config');
const allApis = require('../routes/apis');

const app = express();
const port = backendPort || 5000;

// Connect With DB
mongoose.connect(uri ,connectionParams)
  .then(() => console.log('DB Connected'))
  .catch((e) => console.log('Error connecting to DB.', e));

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', allApis);

app.listen(port, () => console.log(`Listening on port ${port}`));
