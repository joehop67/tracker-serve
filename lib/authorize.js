const User = require('./db')
const jwt = require('jsonwebtoken')
const error = require('../lib/reterror')

/**
 * Authorize user JWT Token
 * 
 * @param {Object} payload
 * @param {Object} options - req
 * @param {Object} res
 * @return {Object}
 */

module.exports = (payload, options, res) => {
  if (options.headers['authorization']) {
    const token = options.headers['authorization'].split('Bearer ')[1]
      return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err)
          return {}
        }
        return User.findById(decoded.id).then(() => {
          return { ...payload, ...decoded }
        }, err => {
            if (err) console.log(err)
            return {}
          })
      })
  } else return error(403, 'Missing authorization payload', res)
}