/**
 * Dependencies
 */
const User = require('../../../models/db')
const Request = require('../../../models/request')
const error = require('../../../lib/reterror')

module.exports = {
  get: {
    /**
     * Get Current Partner of User
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/': (data, options, res) => {
      return User.findById(data.id).then(user => {
        if (user.hasPartner) return User.findById(user.partner).then(partner => {
          if (partner.partner.toString() === data.id) return {id: partner._id, email: partner.email, partner: partner.partner}
          else {
            console.log('something is wrong here')
            return error(500, 'Something is wrong', res)
          }
        })
      })
    }
  }
}