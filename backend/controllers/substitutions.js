const Substitution = require('../models/Substitutions');

substitutions = (req, res, next) => {
    let { date, email } = req.body;
    const subChart = new Substitution({
        subDate: date,
        userEmail: email
    });
    subChart.save()
    .then((res) => {
        res.status(200).json({
            success: true,
            message: 'Data Saved',
        });
    })
    .catch((res) => {
        res.status(200).json({
            success: false,
            message: 'Data is Fraud, You fraud'
        });
    })
}

module.exports = {
    substitutions,
} 