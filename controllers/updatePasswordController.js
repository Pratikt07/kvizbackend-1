const { updatePassword } = require('./dbUpdatePassword');

module.exports.updatePassword = async (req, res) => {
    try {
        let data = await updatePassword(req, res);
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
        res.status(501).json({ status: false, message: err });
    }
};
