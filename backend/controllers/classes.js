const Classes = require('../models/Classes');
const { showAllSections } = require('../utils/teachers');
const { modifyClassesData } = require('../utils/classes');

addClasses = (req, res, next) => {
  let { classesList, email } = req.body;
  classesList.forEach((myClass) => {
    const allSections = showAllSections(myClass.numberOfSections);
    allSections.forEach((section) => {
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
    .then((data) => {
      const classes = modifyClassesData(data);
      res.status(200).json({
        success: true,
        allClasses: data,
        numSectionsPerClass: classes,
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

updateClasses = (req, res, next) => {
  let { classesList, email } = req.body;
  const updatedClasses = []
  classesList.forEach((myClass) => {
    const allSections = showAllSections(myClass.numberOfSections);
    allSections.forEach((section) => {
      // Dont save disabled classes.
      if (myClass.disabled !== true) {
        const label = `${myClass.label} - ${section}`;
        const classToBeSaved = new Classes({
          label,
          userEmail: email,
          class: myClass.value,
        });
        updatedClasses.push(classToBeSaved);
        classToBeSaved.save()
          .then(response => {
            console.log('Saved', response);
          })
          .catch(err => {
            res.status(200).json({
              success: false,
              message: 'Classes not saved. Please try again.',
              errors: err,
            });
          })
        }
      });
  });
  classesList = [...classesList, ...updatedClasses];
  const classes = modifyClassesData(classesList);
  res.status(200).json({
    success: true,
    message: 'Saved successfully',
    allClasses: classesList,
    numSectionsPerClass: classes,
  });
}

module.exports = {
  addClasses,
  getAllClasses,
  updateClasses,
};
