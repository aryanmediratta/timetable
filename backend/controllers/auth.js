const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/Users');
const { createJWT } = require('../utils/auth');

const { secretToken } = require('../server/config');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

signup = (req, res, next) => {
    let { name, email, password, passwordConfirmation } = req.body;
    let errors = [];
    if (!name) {
        errors.push({ name: "required" });
    }
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid" });
    }
    if (!password) {
        errors.push({ password: "required" });
    }
    if (!passwordConfirmation) {
        errors.push({
            passwordConfirmation: "required",
        });
    }
    if (password != passwordConfirmation) {
        errors.push({ password: "mismatch" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    // All Validations completed, checking Login Logic.
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(422).json({ errors: [{ user: "email already exists" }] });
            } else {
                const user = new User({
                    name: name,
                    email: email,
                    password: password,
                });
                bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(response => {
                            res.status(200).json({
                                success: true,
                                result: response
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                errors: [{ error: err }]
                            });
                        });
                    });
                });
            }
        }).catch(err => {
            res.status(500).json({
                errors: [{ error: err }]
            });
        });
    }

signin = (req, res) => {
    let { email, password } = req.body;
    let errors = [];
    if (!email) {
        errors.push({ email: "required" });
    }
    if (!emailRegexp.test(email)) {
        errors.push({ email: "invalid email" });
    }
    if (!password) {
        errors.push({ passowrd: "required" });
    }
    if (errors.length > 0) {
        return res.status(422).json({ errors: errors });
    }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(404).json({
                errors: [{ user: "not found" }],
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(400).json({ errors: [{ password: "incorrect" }]});
                }
                let accessToken = createJWT(
                    user.email,
                    user._id,
                    3600
                );
                jwt.verify(accessToken, secretToken, (err, decoded) => {
                    if (err) {
                        res.status(500).json({ errors: err });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: accessToken,
                            message: user
                        });
                    }
                });
            })
            .catch(err => {
                res.status(500).json({ errors: err });
            });
        }
    })
    .catch(err => {
        res.status(500).json({ errors: err });
    });
}

module.exports = {
    signin,
    signup,
};