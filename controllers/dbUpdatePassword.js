const bcrypt = require('bcrypt');
const db = require('../models/index');

module.exports.updatePassword = async (req, res) => {
    try {
        let email = req.body.email;
        if (email != undefined) {
            let password = req.body.password;
            let cpassword = req.body.cpassword;
            if (password === cpassword) {
                let hashvalue = await bcrypt.hash(password, 10);
                let data = await db.users.update(
                    { password: hashvalue },
                    {
                        where: {
                            email: email,
                        },
                        returning: true,
                        plain: true,
                    }
                );

                if (data[1] == 0) {
                    return {
                        status: false,
                        message: 'No user exist with this is email',
                    };
                }
                return {
                    status: true,
                    message: 'Password Sucessfully Update',
                };
            } else {
                return {
                    status: false,
                    message: "password and confirm password doesn't Match",
                };
            }
        }
    } catch (err) {
        throw err;
    }
};
