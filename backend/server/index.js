const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// const { saveDataInDatabase } = require('../database/utils');
const { backendPort, uri, connectionParams } = require('./config');

const allApis = require('../routes/apis');
const { easy } = require('../geneticAlgorithm/performCrossover');
const { NUM_PERIODS } = require('../geneticAlgorithm/constants');

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

// Testing code, Will remove
app.get('/api/hello', (_req, res) => {
    res.send({ express: 'Hello From Express!!!' });
});

app.get('/api/fetch_static_timetable', (_req, res) => {
    const tt = easy();
    res.send({
        timetable: tt,
        numPeriods: NUM_PERIODS,
    });
});

// Testing code, Will remove
// app.post('/api/world', (req, res) => {
//     console.log(req.body);
//     const data = {
//         text: req.body.post,
//     };
//     saveDataInDatabase('testing-db', 'testing-db', data);
//     res.send({
//         success: true,
//         message: `I received your POST request. This is what you sent me: ${req.body.post}`,
//     });
// });

//Teachers.js Save Button POST Call
app.post('/api/save', (req, res) => {
    console.log(req.body);
    res.send({
        message: `Save Request POSTED!!!!. Have a look at it`,
    });
});


app.use('/api', allApis);

app.listen(port, () => console.log(`Listening on port ${port}`));
