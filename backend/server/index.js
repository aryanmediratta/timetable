const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const { backendPort, uri, connectionParams } = require('./config');

const allApis = require('../routes/apis');
const { easy } = require('../geneticAlgorithm/performCrossover');
const { NUM_PERIODS, NUM_CLASSES, NUM_TEACHERS } = require('../geneticAlgorithm/constants');
const Teacher = require('../models/Teachers');
const Classes = require('../models/Classes');

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

app.get('/api/fetch_static_timetable', (req, res) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  const numClasses = url.searchParams.get('numClasses') || NUM_CLASSES;
  const numTeachers = url.searchParams.get('numTeachers') || NUM_TEACHERS;
  const numPeriods = url.searchParams.get('numPeriods') || NUM_PERIODS;
  // console.log(numClasses);
  // console.log(numTeachers);
  // console.log(numPeriods);
  const confirmClass = [];
    Classes.find({ userEmail: email })
    .then(classData => {
      classData && classData.forEach((obj) => {
        confirmClass.push(obj);
      });
    })
    Teacher.find({ userEmail: email })
    .then(teacherData => {
      const allData = {
        teachersList: teacherData,
        numClasses,
        numTeachers,
        numPeriods,
      };
      teacherData && teacherData.forEach((teacher) => {
        teacher.classesTaught.forEach((classObject) => {
          const found = confirmClass.findIndex((e) => e._id === classObject._id);
          if (found !== -1) {
            const totalPeriods = confirmClass[found].periodsPerWeek + classObject.periodsPerWeek;
            confirmClass[found] = { ...confirmClass[found], periodsPerWeek: totalPeriods };
          }
        });
      });
      const threshold = (section) => section.periodsPerWeek === 30;
      if (confirmClass.every(threshold)) {
        console.log('WERK WERK WERK WERK WERK');
        const tt = easy(allData);
        res.send({
          timetable: tt,
          numPeriods: numPeriods,
        });
      } else {
        console.log('THIS DOESNT WERK!!!');
      }
      // console.log('data',allData);
    //   const tt = easy(allData);
    // res.send({
    //   timetable: tt,
    //   numPeriods: numPeriods,
    // });
    })
    .catch(err => {
      res.send({
        success: false,
        message: err,
      })
    })
});

//Teachers.js Save Button POST Call
app.post('/api/save', (req, res) => {
    console.log(req.body);
    res.send({
        message: `Save Request POSTED!!!!. Have a look at it`,
    });
});


app.use('/api', allApis);

app.listen(port, () => console.log(`Listening on port ${port}`));
