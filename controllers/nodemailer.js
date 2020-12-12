const nodemailer = require('nodemailer');

//step1
module.exports.sendMail = async function (mailOption) {
    try {
        //step1

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        //step2

        let mailInfo = await transporter.sendMail(mailOption);
        return mailInfo;
    } catch (err) {
        throw err;
    }
};
