/**
 * Dependencies
 */
const userWithPartner = require('../../lib/partner')
const error = require('../../lib/reterror')
const User = require('../../models/db')
const strip = require('../../lib/strip')

module.exports = {
  get: {
    /**
     * Get user by ID
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/:user': (data, options, res) => {
      return userWithPartner(data.user).then(user => user)
    }
  },
  post: {
    /**
     * Search by user's name or email
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/search': (data, options, res) => {
      const {name, email} = data
      if (name) {
        return User.find({name: { "$regex": name, "$options": "i" }}).then(users => {
          const modified = users.map(user => {
            return strip(user._doc)
          })
          return modified
        })
      } else if (email) {
        return User.find({email: email}).then(users => {
          const modified = users.map(user => {
            return strip(user._doc)
          })
          return modified
        })
      } else return error(500, 'No search entered', res)
    }
  }
}