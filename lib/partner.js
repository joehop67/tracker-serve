/**
 * Dependencies
 */
const User = require('../models/db')

/**
 * Find user and (if applicable) parter
 * if user has partner return partner and user
 * if not just return user
 * 
 * @param {Object|String} id
 * @returns {Object} 
 */
module.exports = id => {
  return User.findById(id).then(user => {
    const {password, ...noPass} = user._doc
    if (user.hasPartner) {
      return User.findById(user.partner).then(partner => {
        var {password, ...partnerNoPass} = partner._doc
        const userAndPartner = {user: noPass, partner: partnerNoPass}
        return userAndPartner
      })
    } else {
      return {user: noPass}
    }
  })
}