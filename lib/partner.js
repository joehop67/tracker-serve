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
    if (user.hasPartner) {
      return User.findById(user.partner).then(partner => {
        const userAndPartner = {user: user, partner: partner}
        return userAndPartner
      })
    } else {
      return {user: user}
    }
  })
}