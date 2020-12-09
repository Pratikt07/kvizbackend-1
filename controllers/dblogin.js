const bcrypt = require('bcrypt');
const db = require('../models/index');
module.exports.authenticateUser = async (req, res) => {
    try {
        let data = await db.users.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (data == null) {
            res.json({
                status: null,
            });
        }

        let match = await bcrypt.compare(req.body.password, data.password);
        if (match == true) return true;
        else return false;
    } catch (err) {
        throw err;
    }
};
