/**
 * Dependencies
 */
const userWithPartner = require('../../lib/partner')
const error = require('../../lib/reterror')

module.exports = {
  get: {
    '/:user': (data, options, res) => {
      return userWithPartner(data.user).then(user => user)
    }
  }
}