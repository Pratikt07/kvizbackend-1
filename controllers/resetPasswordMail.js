const db = require('../models/index');
const { sendMail } = require('./nodemailer');
//var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.resetPasswordMail = async (req, res) => {
    try {
        console.log(req.body.email);
        if (req.body.email != undefined) {
            let data = await isUserExist(req.body.email);
            if (data == null || data.length == 0) return false;

            let token = await bcrypt.hash(
                data.email + '' + data.created_at,
                10
            );

            let email = req.body.email;
            let link = `http://${req.get(
                'host'
            )}/resetpassword/${email}/${token}`;

            let mailOption = {
                from: process.env.EMAIL, // sender address
                to: email, // list of receivers
                subject: 'password reset link', // Subject line
                html:
                    'Hello, <br> Please Click on link below to reset password.<br> click <a href="' +
                    link +
                    '"> here </a> to verify.',
            };
            await sendMail(mailOption);
            return true;
        }
    } catch (err) {
        throw err;
    }
};

async function isUserExist(email) {
    try {
        let data = await db.users.findOne({
            where: {
                email: email,
            },
        });

        return data;
    } catch {
        console.log('errr', err);
        throw err;
    }
}
