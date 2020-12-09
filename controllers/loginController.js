const { authenticateUser } = require('./dblogin');
module.exports.login = async (req, res) => {
    let value = await authenticateUser(req, res);
    res.json({
        status: value,
    });
};
