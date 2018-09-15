const authorize = require('../../../../lib/authorize')

module.exports = {
  post: {
    '/': {
      title: 'Request someone be a parter in your plans',
      description: 'Allows couples to plan their finances as one entity',
      middleware: [authorize],
      data: {
        partner: {
          type: 'string',
          required: 'true'
        },
        message: {
          type: 'string'
        }
      }
    },
    '/accept': {
      title: 'Accept request for a partner',
      middleware: [authorize],
      data: {
        request: {
          type: 'string',
          required: true
        },
        accept: {
          type: 'string',
          required: true
        }
      }
    }
  },
  get: {
    '/': {
      title: 'Get all partner requests',
      middleware: [authorize],
      data: {}
    }
  }
}