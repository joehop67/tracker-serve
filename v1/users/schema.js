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
  },
  post: {
    '/search': {
      title: 'Find users',
      middleware: [authorize],
      data: {
        name: {
          type: 'string'
        },
        email: {
          type: 'string'
        }
      }
    }
  }
}