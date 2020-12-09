const { registerUser } = require('./dbregister');
module.exports.register = (req, res) => {
    registerUser(req, res);
};
