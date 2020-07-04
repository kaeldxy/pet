const secret = "664"
function crypt(pw) {
    const crypto = require('crypto');
    const hash = crypto.createHash('md5');
    hash.update(pw + secret);
    return hash.digest('hex');
}

module.exports = { secret, crypt }