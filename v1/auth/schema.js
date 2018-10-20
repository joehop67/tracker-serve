/**
 * Dependencies
 */

const authorize = require('../../lib/authorize')

module.exports = {
  get: {
    '/': {
      middleware: [authorize]
    }
  },
  post: {
    '/register': {
      title: 'test',
      data: {
        email: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        },
        name: {
          type: 'string'
        },
        salary: {
          type: 'string'
        }
      }
    },
    '/login': {
      title: 'Login to tracker',
      data: {
        email: {
          type: 'string',
          required: true
        },
        password: {
          type: 'string',
          required: true
        }
      }
    }
  }
}