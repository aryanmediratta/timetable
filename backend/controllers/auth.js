const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/Users');
const { createJWT } = require('../utils/auth');

const { secretToken } = require('../server/config');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const DEFAULT_LOGIN_DURATION = 7200;

signup = (req, res, next) => {
    let { name, email, password, passwordConfirmation } = req.body;
    let errors = [];
    if (!name) {
        errors.push('Name is Required.');
    }
    if (!email) {
        errors.push('Email is Required.');
    }
    if (!emailRegexp.test(email)) {
        errors.push('Invalid Email.');
    }
    if (!password) {
        errors.push('Password is Required.');
    }
    if (!passwordConfirmation) {
        errors.push('Please type password again.');
    }
    if (password !== passwordConfirmation) {
        errors.push('Passwords dont match.');
    }
    if (errors.length > 0) {
        return res.status(200).json({
            success: false,
            message: errors[0],
        });
    }
    // All Validations completed, checking Login Logic.
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(200).json({
                    success: false,
                    message: 'Email Already Exists. Please Login or create new account',
                });
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
                        .then(_res => {
                            let accessToken = createJWT(
                                user.email,
                                user._id,
                                DEFAULT_LOGIN_DURATION,
                            );
                            jwt.verify(accessToken, secretToken, (err, decoded) => {
                                if (err) {
                                    res.status(200).json({ success: false, message: 'Verification Failed. Please Try Again.' });
                                }
                                if (decoded) {
                                    return res.status(200).json({
                                        success: true,
                                        token: accessToken,
                                        userName: user.name,
                                        message: 'User Created Succesfully',
                                    });
                                }
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
      errors.push('Email is Required.');
  }
  if (!emailRegexp.test(email)) {
      errors.push('Invalid Email.');
  }
  if (!password) {
      errors.push('Password is Required.');
  }
  if (errors.length > 0) {
    return res.status(200).json({
        success: false,
        message: errors[0],
    });
  }
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return res.status(200).json({
              success: false,
              message: 'User Not Found',
            });
        } else {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(200).json({ success: false, message: 'Incorrect Password' });
                }
                let accessToken = createJWT(
                    user.email,
                    user._id,
                    DEFAULT_LOGIN_DURATION,
                );
                jwt.verify(accessToken, secretToken, (err, decoded) => {
                    if (err) {
                        res.status(200).json({ success: false, message: 'Verification Failed. Please Try again.' });
                    }
                    if (decoded) {
                        return res.status(200).json({
                            success: true,
                            token: accessToken,
                            user: user,
                            userName: user.name,
                        });
                    }
                });
            })
            .catch(err => {
                res.status(500).json({ success: false, message: 'Verification Failed. Please Try again.' });
            });
        }
    })
    .catch(err => {
        res.status(500).json({ success: false, message: 'Verification Failed. Please Try again.' });
    });
}

module.exports = {
    signin,
    signup,
};
