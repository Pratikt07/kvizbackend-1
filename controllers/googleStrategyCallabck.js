const db = require('../models/index');

module.exports.googleStrategyCallback = async (
    accessToken,
    refreshToken,
    profile,
    done
) => {
    try {
        // passport callback function
        //check if user already exists in our db with the given profile ID

        let currentUser = await db.users.findOne({
            where: { googleId: profile.id },
        });

        if (currentUser != null) return done(null, currentUser);
        else {
            const user = {
                email: profile.emails[0].value,
                fullname: profile.displayName,
                googleId: profile.id,
                created_at: new Date(),
                activestatus: true,
            };

            // Save user in the database
            let newUser = await db.users.create(user);
            return done(null, newUser);
        }
    } catch (err) {
        console.log(err, 'inside error block');
        return done(null, false);
    }
};
