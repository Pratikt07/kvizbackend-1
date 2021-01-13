const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var multer  = require('multer');
const helpers = require('./controllers/helpers')
const storage = require('./controllers/storageImg')
let upload = multer({ storage: storage, fileFilter: helpers.imageFilter });



const homeRoute = require('./routes/homeRoute');
const registerRouter = require('./routes/registerRoute');
const loginRouter = require('./routes/loginRoute');
const verifyUserRouter = require('./routes/verifyRegisterUserRoute');
const authRouter = require('./routes/googleAuthRoute');
const authRedirectRouter = require('./routes/googleAuthRedirectiRoute');
const resetMailRouter = require('./routes/resetPasswordMailRoute');
const updatePasswordRouter = require('./routes/updatePasswordRoute');
const db = require('./models/index');
const addquestionRouter = require('./routes/addquestionRoute');
const editquestionRouter = require('./routes/editquestionRoute');
const addoptionContoller = require('./routes/addOptionRoute');
const deleteQuestion = require('./routes/DeleteQuestionRoute');
const addQuiz = require('./routes/addQuizRoute');
const createQuiz = require('./routes/createQuizRoute');
const getCategoryRouter = require('./routes/getCategoriesRoute');
const getquestionRouter = require('./routes/getQuestionRoute');
const {
    googleStrategyCallback,
} = require('./controllers/googleStrategyCallabck');
const app = express();

app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: '/auth/google/redirect',
        },
        googleStrategyCallback
    )
);

app.use(passport.initialize());
passport.serializeUser((user, done) => {
    return done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    let user = await db.users.findByPk(id);
    if (user == null) return done(null, false);

    return done(null, user);
});


 


app.use('/', homeRoute);
app.use('/register', registerRouter);
app.use('/verify', verifyUserRouter);
app.use('/auth/google', authRouter);
app.use('/auth/google/redirect', authRedirectRouter);
app.use('/login', loginRouter);
app.use('/resetPassword', resetMailRouter);
app.use('/updatePassword', updatePasswordRouter);
app.use('/addquestion', addquestionRouter);
app.use('/editquestion',upload.single('option_image'), editquestionRouter);
app.use('/addoption',addoptionContoller);
app.use('/deletequestion',deleteQuestion);
app.use('/addquiz',upload.single('quiz_img'),addQuiz);
app.use('/createquiz',createQuiz);
app.use('/getallcategories',getCategoryRouter);
app.use('/getquestions',getquestionRouter)
// app.use('/editQuiz',editQuizRouter);
module.exports = app;
