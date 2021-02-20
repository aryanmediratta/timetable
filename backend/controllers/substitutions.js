const Substitution = require('../models/Substitutions');

createNewSubstitution = (req, res, next) => {
    const { date, email, absentList } = req.body;
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

module.exports = {
    createNewSubstitution,
}
