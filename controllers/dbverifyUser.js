const db = require('../models/index');

module.exports.checkUser = async (tokenid, email) => {
    try {
        let data = await db.users.findOne({
            where: {
                email: email,
            },
        });

        if (
            data.length > 0 &&
            Date.now() <= data[0].activeExpires + 3600000 &&
            data[0].activeStatus == 0
        ) {
            if (data[0].activeToken === tokenid) {
                let updateRes = await Users.update(
                    { activeStatus: true },
                    {
                        where: {
                            email: email,
                        },
                    }
                );
            } else {
                throw new Error('Not a valid user');
            }
        } else if (data.length > 0 && data[0].activeStatus == 1) {
            console.log('user alerady authenticated');
            throw new Error('user alerady authenticated');
        } else if (
            data.length > 0 &&
            data[0].activeStatus == 0 &&
            Date.now() > data[0].activeExpires + 3600000
        ) {
            await User.destroy({
                where: {
                    email: email,
                },
            });
            throw new Error(' Link expired ,please Register again ');
        }
    } catch (err) {
        console.log(err);
    }
};
