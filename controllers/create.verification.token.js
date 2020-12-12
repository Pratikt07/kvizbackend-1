const crypto = require('crypto');

module.exports.createVerificationToken = () => {
    let activeToken = crypto.randomBytes(17).toString('hex');

    let activeExpires = Date.now() + 1 * 3600 * 1000;

    return { activeToken, activeExpires };
};
