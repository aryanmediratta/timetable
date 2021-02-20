const Substitution = require('../models/Substitutions');

createNewSubstitution = (req, res, next) => {
    const { date, email, absentList } = req.body;
    const replacement = {
        subDate: date,
        userEmail: email,
        absentTeachers: absentList,
    };
    if (date) {
      Substitution.findOneAndReplace({ userEmail: email, subDate: date }, replacement, { returnNewDocument: true })
        .then(response => {
          res.status(200).json({
            success: true,
            message: 'Update Successful',
          });
        })
        .catch(err => {
          res.status(200).json({
            success: false,
            message: 'Update Unsuccessful'
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
              success: true,
              message: 'Data Saved',
          });
      })
      .catch((err) => {
          console.log(err)
          res.status(200).json({
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
      const { absentTeachers } = data;
      res.status(200).json({
        success: true,
        absentList: absentTeachers,
      });
    })
    .catch(err => {
      res.status(200).json({
        absentList: [],
        message: 'Empty List Received',
      });
    });
}

module.exports = {
  createNewSubstitution,
  fetchSubstitution,
}
