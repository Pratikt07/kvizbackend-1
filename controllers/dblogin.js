const bcrypt = require('bcrypt');
const db = require('../models/index');
module.exports.authenticateUser = async (req, res) => {
    try {
        console.log(req.body.email)
        let data = await db.users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (data == null || data.length) {
            res.json({
                status: null,
            });
        }
        console.log(data);
        if (!data.password) {
            res.json({
                status: false,
                message: 'Try login with google',
            });
        }
        let match = await bcrypt.compare(req.body.password, data.password);
        if (match == true) return true;
        else return false;
    } catch (err) {
        throw err;
    }
};
