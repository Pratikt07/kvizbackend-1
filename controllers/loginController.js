const { authenticateUser } = require('./dblogin');
module.exports.login = async (req, res) => {
    try {
        let value = await authenticateUser(req, res);
        res.json({
            status: value,
        });
    } catch (err) {
        console.log(err);
    }
};
