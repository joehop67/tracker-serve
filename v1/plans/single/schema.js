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
        },
        budget: {
          type: 'string'
        }
      }
    }
  },
  put: {
    '/update/budget/:id': {
      title: 'Update existing budget',
      middleware: [authorize],
      data: {
        name: {
          type: 'string'
        },
        expense: {
          type: 'string'
        }
      }
    }
  },
  get: {
    '/budgets': {
      title: 'Get all users budgets',
      middleware: [authorize],
      data: {}
    },
    '/expenses': {
      title: 'Get all user expenses',
      middleware: [authorize],
      data: {}
    }
  }
}