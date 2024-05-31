const {createHash} = require('crypto')

function createHashPassword(password){
    const hash = createHash('sha256').update(password).digest('hex')
    return hash
}

module.exports = createHashPassword