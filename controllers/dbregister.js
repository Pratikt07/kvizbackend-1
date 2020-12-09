const bcrypt = require('bcrypt');
const db = require('../models/index');

module.exports.registerUser = async (req, res) => {
    if (await isUserExist(req.body.email)) {
        return;
    } else {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create a user
        const user = {
            email: req.body.email,
            mobile_no: req.body.mobile,
            password: hashedPassword,
            created_at: new Date(),
            fullname: req.body.fullname,
        };

        // Save user in the database
        db.users.create(user).then((data) => {
            res.send(data);
        });
    }
};

async function isUserExist(email) {
    try {
        let data = await db.users.findOne({
            where: {
                email: email,
            },
        });

        if (data == null) return false;
        else return true;
    } catch {
        (err) => {
            res.status(500).send({
                message: 'Error retrieving Tutorial with id=' + id,
            });
        };
    }
}
