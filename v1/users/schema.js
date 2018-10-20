/**
 * Dependencies
 */
const authorize = require('../../lib/authorize')

module.exports = {
  get: {
    '/:user': {
      title: 'Get user by id',
      middleware: [authorize],
      data: {}
    }
  }
}