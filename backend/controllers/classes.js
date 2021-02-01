const Classes = require('../models/Classes');
const { showAllSections } = require('../utils/teachers');

addClasses = (req, res, next) => {
  let { classesList, email } = req.body;
  classesList.forEach(myClass => {
    const allSections = showAllSections(myClass.numberOfSections);
    allSections.forEach(section => {
      const label = `${myClass.label} - ${section}`;
      const classToBeSaved = new Classes({
        label,
        userEmail: email,
        class: myClass.value,
      });
      classToBeSaved.save()
        .then(response => {
          console.log('Saved', response);
        })
        .catch(err => {
          res.status(200).json({
            success: true,
            message: 'Classes Saved',
            errors: err,
          });
        })
    });
  });
  res.status(200).json({
    success: true,
    message: 'Classes Saved',
  });
}

getAllClasses = (req, res, next) => {
  const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
  const email = url.searchParams.get('email');
  Classes.find({ userEmail: email })
    .then(data => {
      res.status(200).json({
        success: true,
        classes: data,
      });
    })
    .catch(err => {
      res.status(200).json({
        success: false,
        response: err,
        message: 'Could not fetch data, please try again',
      });
    });
}

module.exports = {
  addClasses,
  getAllClasses,
};
