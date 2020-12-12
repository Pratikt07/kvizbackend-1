const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const homeRoute = require('./routes/homeRoute');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');
const verifyUserRouter = require('./routes/verifyRegisterUserRoute');
const authRouter = require('./routes/googleAuthRoute');
const authRedirectRouter = require('./routes/googleAuthRedirectiRoute');
const resetMailRouter = require('./routes/resetPasswordMailRoute');
const updatePasswordRouter = require('./routes/updatePasswordRoute');
const app = express();

app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', homeRoute);
app.use('/register', registerRouter);
app.use('/verify', verifyUserRouter);
app.use('/auth/google', authRouter);
app.use('/auth/google/redirect', authRedirectRouter);
app.use('/login', loginRouter);
app.use('/resetPassword', resetMailRouter);
app.use('/updatePassword', updatePasswordRouter);

module.exports = app;
