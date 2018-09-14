const User = require('../../lib/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const error = require('../../lib/reterror')

module.exports = {
  // Test Route
  get: {
    '/': data => data
  },
  post: {
    /**
     * Register User
     * 
     * @param {Object} data
     */
    '/register': data => {
      if (data.email && data.password) {
        const hashed = bcrypt.hashSync(data.password, 10)
        return User.create({ email: data.email, password: hashed }).then(user => tokenize({id: user._id}))
      }
      return 'No email entered'
    },
    /**
     * Login User and return JWT Auth Token
     * 
     * @param {Object} data
     * @param {Object} req
     * @param {Object} res
     */
    '/login': (data, req, res) => {
      if (data.email && data.password) {
        return User.findOne({email: data.email}).then(user => {
          if (!user) return error(404, 'No User Found', res)
          if (bcrypt.compareSync(data.password, user.password)) {
            return tokenize({id: user._id, current_user: user.email})
          } else {
            return error(403, 'Incorrect Password', res)
          }
        })
      }
    }
  }
}

/**
 * Generate JWT Auth token
 * 
 * @param {Object} user
 * @param {String, Number} expires
 */

function tokenize (user, expires = '7d') {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: expires
  })
}