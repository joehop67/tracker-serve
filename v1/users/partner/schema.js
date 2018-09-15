const authorize = require('../../../lib/authorize')

module.exports = {
  get: {
    '/': {
      title: 'Get Partner',
      middleware: [authorize],
      data: {}
    }
  }
}