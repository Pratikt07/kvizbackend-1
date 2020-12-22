const { registerUser } = require('./dbregister');
module.exports.register = async (req, res) => {
    try {
        let data = await registerUser(req, res);
        res.status(201).json({
            status: data,
        });
    } catch (err) {
        res.status(501).json({
            status: false,
            msg: 'not register',
        });
        
    }
};
