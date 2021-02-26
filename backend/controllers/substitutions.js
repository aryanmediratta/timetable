const Substitution = require('../models/Substitutions');

const { generateSubstitutions } = require('../utils/substitutions');

createNewSubstitution = (req, res, next) => {
    const { date, email, absentList, _id } = req.body;
    // console.log(generateSubstitutions(date));
    console.log(_id);
    const replacement = {
        _id: _id,
        subDate: date,
        userEmail: email,
        absentTeachers: absentList,
    };
    if (_id) {
      Substitution.findOneAndReplace({ userEmail: email, _id: _id }, replacement, { returnNewDocument: true })
        .then(response => {
          res.status(200).json({
            _id: response._id,
            success: true,
            message: 'Update Successful',
          });
        })
        .catch(err => {
          res.status(200).json({
            _id: '',
            success: false,
            message: 'No Updates Made',
          })
        });
    } else {
      const subChart = new Substitution({
          subDate: date,
          userEmail: email,
          absentTeachers: absentList,
      });
      subChart.save()
      .then(response => {
          res.status(200).json({
              _id: response._id,
              success: true,
              message: 'Data Saved',
          });
      })
      .catch((err) => {
          res.status(200).json({
              _id: '', 
              success: false,
              message: 'Data is Fraud, You fraud'
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
      const { absentTeachers, _id } = data;
      res.status(200).json({
        success: true,
        absentList: absentTeachers,
        _id: _id,
        message: 'Absent List Received',
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        absentList: [],
        _id: '',
        message: 'Empty List Received',
      });
    });
}

module.exports = {
  createNewSubstitution,
  fetchSubstitution,
}
