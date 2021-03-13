const Substitution = require('../models/Substitutions');
const Timetable = require('../models/Timetables');
const Teacher = require('../models/Teachers');

const { generateSub } = require('../utils/substitutions');

createNewSubstitution = (req, res, next) => {
    const { date, email, absentList, _id, subChart } = req.body;
    const replacement = {
        _id: _id,
        subDate: date,
        userEmail: email,
        absentTeachers: absentList,
        subChart: subChart,
    };
    if (_id) {
      Substitution.findOneAndReplace({ userEmail: email, _id: _id }, replacement, { returnNewDocument: true })
        .then(response => {
          res.status(200).json({
            _id: response._id,
            success: true,
            message: 'Updated Succesful.',
          });
        })
        .catch(err => {
          res.status(200).json({
            _id: '',
            success: false,
            message: 'Update Unsuccessful.',
          })
        });
    } else {
      const sub = new Substitution({
          subDate: date,
          userEmail: email,
          absentTeachers: absentList,
          subChart: subChart,
      });
      sub.save()
      .then(response => {
          res.status(200).json({
              _id: response._id,
              success: true,
              message: `Absent Teachers List For ${date} created.`,
          });
      })
      .catch((err) => {
          res.status(200).json({
              _id: '', 
              success: false,
              message: 'Failed To Create Absent Teachers List'
          });
      })
    }
}

fetchSubstitution = (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  const date = url.searchParams.get('date');
  Substitution.findOne({ userEmail: email, subDate: date })
    .then(data => {
      const { absentTeachers, _id, subChart } = data;
      res.status(200).json({
        success: true,
        absentList: absentTeachers,
        _id: _id,
        subChart: subChart, 
        message: `Substitution Data for ${date} Retrieved.`,
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        absentList: [],
        _id: '',
        subChart: [],
        message: `Unable To Retrieve Substitution Data for ${date}.`,
      });
    });
}

generateSubstitutions = async (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  const date = url.searchParams.get('date');
  let getTimetable;
  let absentList;
  let teachersList;
  await Substitution.findOne({ userEmail: email, subDate: date })
    .then(data => {
      const { absentTeachers } = data;
      absentList = absentTeachers;
    })
    .catch(data => {
      res.send({
        success: false,
        absentList: [],
        message: 'Failed To Create Substitution Chart.',
      });
    });
  await Teacher.find({ userEmail: email })
    .then(data => {
      teachersList = data;
    })
    .catch(data => {
      res.send({
        success: false,
        teachersList: [],
        message: 'Failed To Create Substitution Chart.',
      });
    });
  await Timetable.findOne({ userEmail: email })
    .then(data => {
      const { timetable } = data;
      getTimetable = timetable;
    })
    .catch(err => {
      console.log('ERROR', err);
      res.send({
        success: false,
        timetable: [],
        message: 'Failed To Create Substitution Chart.',
      });
    });
  const substitutionChart = generateSub(date, getTimetable, absentList, teachersList);
  res.status(200).json({
    success: true,
    subChart: substitutionChart,
    message: 'Substitution Chart Created.',
  });
  // console.log(generateSub(date, getTimetable, absentList, teachersList));
}

module.exports = {
  createNewSubstitution,
  fetchSubstitution,
  generateSubstitutions,
}
