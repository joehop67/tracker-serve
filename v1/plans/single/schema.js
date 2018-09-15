/**
 * Dependencies
 */
const authorize = require('../../../lib/authorize')

module.exports = {
  post: {
    '/new/budget': {
      title: 'Create new budget',
      middleware: [authorize],
      data: {
        name: {
          type: 'string'
        },
        salary: {
          type: 'number',
          required: true
        },
        savings: {
          type: 'number',
          required: true
        },
        expenses: {
          type: 'array'
        }
      }
    },
    '/new/expense': {
      title: 'Create new expense',
      middleware: [authorize],
      data: {
        type: {
          type: 'string',
          required: true
        },
        name: {
          type: 'string',
          required: true
        },
        cost_type: {
          type: 'string',
          required: true
        },
        cost: {
          type: 'number',
          required: true
        }
      }
    }
  }
}