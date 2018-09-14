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
        userEmail: {
          type: 'string',
          required: true
        },
        message: {
          type: 'string'
        }
      }
    }
  }
}