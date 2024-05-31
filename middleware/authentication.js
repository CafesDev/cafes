const jwt = require('jsonwebtoken')
/**
 * 
 * @param {string} payload 
 * @returns {Object | null} 
 * This function gives you a jsonwebtoken for the object you created
 */
function generateToken(payload){
    let token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '2d'})
    return token   
}

/**
 *
 * @param {string} token 
 */
function verifyToken(token){
    return jwt.decode(token, {complete: true})
}

module.exports.generateToken = generateToken
module.exports.verifyToken = verifyToken
