const bcrypt = require('bcrypt');
const db = require('../models/index');
const { createVerificationToken } = require('./create.verification.token');
const { sendMail } = require('./nodemailer');

module.exports.registerUser = async (req, res) => {
    try {
        if (await isUserExist(req.body.email)) {
            return false;
        } else {
            let { activeExpires, activeToken } = createVerificationToken();
            let link = `http://${req.get(
                'host'
            )}/verify?id=${activeToken}&email=${req.body.email}`;

            let mailOption = {
                from: process.env.EMAIL, // sender address
                to: req.body.email, // list of receivers
                subject: 'Please confirm your Email account', // Subject line
                html:
                    'Hello, <br> Please Click on the link to verify your email.<br> click <a href="' +
                    link +
                    '"> here </a> to verify.',
            };
            let hashedPassword = await bcrypt.hash(req.body.password, 10);
            // Create a user
            const user = {
                email: req.body.email,
                mobile_no: req.body.mobile,
                password: hashedPassword,
                created_at: new Date(),
                fullname: req.body.fullname,
                activeToken: activeToken,
                activeExpires: activeExpires,
                activestatus: false,
            };

            // Save user in the database
            let dbInsert = await db.users.create(user);
            let mailsent = await sendMail(mailOption);

            console.log('Message sent: %s', mailsent.messageId);
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

        if (data == null) return false;
        else return true;
    } catch {
        (err) => {
            res.status(500).send({
                message: 'Error retrieving Tutorial with id=' + id,
            });
        };
    }
}
