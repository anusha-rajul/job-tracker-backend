const bcrypt = require('bcrypt')


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

async function comparePassword(password, user) {
    return await bcrypt.compare(password, user)
}



module.exports = {hashPassword, comparePassword}