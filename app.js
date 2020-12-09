const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const homeRoute = require('./routes/homeRoute');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');

const app = express();

app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use('/', homeRoute);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

module.exports = app;
