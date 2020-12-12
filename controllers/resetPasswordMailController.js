const { resetPasswordMail } = require('./resetPasswordMail');
const { dbVerifyPassword } = require('./dbVerifyPassword');

exports.resetMail = async (req, res) => {
    try {
        let status = await resetPasswordMail(req, res);
        if (status == true) {
            res.status(200).json({
                status: status,
                message: 'reset password mail has been sent',
            });
        } else {
            res.status(203).json({
                status: status,
                message: "User doesn't Exist ",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};

exports.verifyResetPassword = async (req, res) => {
    try {
        let data = await dbVerifyPassword(req, res);
        if (data.status) {
            res.status(200).json({
                status: data.status,
                message: data.message,
            });
        } else {
            res.status(203).json({
                status: data.status,
                message: data.message,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};
