const bcrypt = require('bcrypt');
const db = require('../models/index');

module.exports.dbVerifyPassword = async (req, res) => {
    try {
        let email = req.params.id;
        let token = req.params.token;

        let data = await db.users.findOne({
            where: {
                email: email,
            },
        });

        if (data == null || data.length == 0)
            return { status: false, message: 'Not a valid User ' };

        let result = await bcrypt.compare(data.password, token);

        if (result) {
            return { status: true, message: 'user sucessfully verified' };
        } else {
            return { status: false, message: 'Link is corrupted ' };
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
};
