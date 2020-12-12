let dbverifyUser = require('./dbverifyUser');
module.exports.verifyRegisterUser = async (req, res) => {
    //
    try {
        let token = req.query;
        await dbverifyUser.checkUser(token.id, token.email);
        res.status(200).json({
            status: true,
            message: 'user Sucesfully Authenticate',
        });
    } catch (err) {
        res.status(501).json({ status: false, message: err });
    }
};
