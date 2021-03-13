const dotenv = require('dotenv');
dotenv.config();

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/Users');
const Timetable = require('../models/Timetables');
const { createJWT } = require('../utils/auth');

const { secretToken } = require('../server/config');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const DEFAULT_LOGIN_DURATION = 86400;

signup = (req, res, next) => {
    let { name, email, password, passwordConfirmation, schoolName, numPeriods } = req.body;
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
                    schoolName,
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
                                  const timetable = new Timetable({
                                    userEmail: email,
                                    numPeriods: numPeriods * 5,
                                  });
                                  timetable.save()
                                    .then(() => {
                                      return res.status(200).json({
                                        success: true,
                                        token: accessToken,
                                        userName: user.name,
                                        message: 'User Created Succesfully',
                                      });
                                    })
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

changePassword = (req, res) => {
    let { userEmail, password, newPassword, confirmNewPassword } = req.body;
    let errors = [];

    if (password === '') {
        errors.push('Password Cannot Be Empty.')
    }
    if (newPassword !== confirmNewPassword) {
        errors.push('New Passwords Do Not Match.');
    }
    if (newPassword === '' || confirmNewPassword === '') {
        errors.push('New Password Cannot Be Empty.');
    }
    if (errors.length > 0) {
        return res.status(200).json({
            success: false,
            message: errors[0],
        });
    } else {
        User.findOne({ email: userEmail })
        .then(user => {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (!isMatch) {
                    return res.status(200).json({
                        success: false,
                        message: 'Passwords Does Not Match.'
                    });
                } else {
                    bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(confirmNewPassword, salt, function(err, hash) {
                        if (err) throw err;
                        user.password = hash;
                        user.save()
                            .then(_user => {
                                res.status(200).json({
                                    success: true,
                                    message: 'Password Changed Successfully',
                                    updated: true,
                                });
                            })
                            .catch(err => {
                                console.log('Error', err);
                                res.status(200).json({
                                    success: false,
                                    response: err,
                                    message: 'Password Change Unsuccessful',
                                });
                            });
                    }) });
                }
            })
        })
        .catch(err => {
            console.log('Error', err);
            res.status(200).json({
                success: false,
                message: 'Something Went Wrong. Please Try Again.',
            });
        })
    }
}

forgotPassword = async (req, res) => {
    let { email } = req.body;
    if (email === '') {
        return res.status(200).json({
            success: false,
            message: "Email Required.",
        });
    }
    await User.findOne({ email: email })
        .then((user) => {
            const token = crypto.randomBytes(20).toString('hex');
            if(user === null) {
                return res.status(200).json({
                    success: false,
                    message: "No such User/Email exists."
                });
            } else {
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000;
                user.save();
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: 'someone@somewhere.com',
                to: `${user.email}`,
                subject: 'Link To Reset Password',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                `http://localhost:8000/resetpassword/${token}\n\n` +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };

            console.log('Sending Mail');

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    return res.status(200).json({
                        success:false,
                        message:'Error in sending mail. Please Try Again.',
                    });
                } else {
                    return res.status(200).json({
                        response: response,
                        success:true,
                        message:'Mail Sent Successfully.',
                    });
                }
            })
        })
        .catch(err => {
            console.log('Error', err);
            res.status(200).json({
                success: false,
                message: 'Something Went Wrong. Please Try Again.'
            });
        });
}

resetLinkValid = (req, res) => {
    const url = new URL(`https://anyrandomwebsite.com/${req.originalUrl}`);
    const token = url.searchParams.get('token');
    User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
        .then((user) => {
            if (user === null) {
                return res.status(200).json({
                    success: false,
                    message: 'Password Reset Link Invalid or Expired.',
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Please Enter New Password',
                    email: user.email,
                });
            }
        })
        .catch(err => {
            console.log('Error');
            res.status(200).json({
                success: false,
                message: 'Something Went Wrong.',
            });
        });
}

resetPassword = (req, res) => {
    let { email, newPassword, confirmNewPassword } = req.body;
    let errors = [];

    if (email === '' || email === null) {
        erros.push('Password Reset Failed. Unable to find User Email.');     
    }
    if (newPassword === '' || confirmNewPassword === '') {
        errors.push('Password Field Cannot Be Empty.')
    }
    if (newPassword !== confirmNewPassword) {
        errors.push('Passwords Do Not Match.');
    }
    if (errors.length > 0) {
        return res.status(200).json({
            success: false,
            message: errors[0],
        });
    } else {
        User.findOne({ email: email })
            .then((user) => {
                bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(confirmNewPassword, salt, function(err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;
                    user.save()
                        .then(_user => {
                            res.status(200).json({
                                success: true,
                                message: 'Password Changed Successfully',
                                updated: true,
                            });
                        })
                        .catch(err => {
                            console.log('Error', err);
                            res.status(200).json({
                                success: false,
                                response: err,
                                message: 'Password Change Unsuccessful.',
                            });
                        });
                }) });
            })
            .catch((err) => {
                console.log('Error', err);
                res.status(200).json({
                    success: false,
                    response: err,
                    message: 'Unable To Reset Password.'
                });
            });
    }
}

module.exports = {
    signin,
    signup,
    changePassword,
    forgotPassword,
    resetLinkValid,
    resetPassword,
};
