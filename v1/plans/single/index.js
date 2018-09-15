/**
 * Dependencies
 */
const Budget = require('../../../models/budget')
const Expense = require('../../../models/expense')
const error = require('../../../lib/reterror')
const userWithPartner = require('../../../lib/partner')

module.exports = {
  post: {
    /**
     * Create new budget
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/new/budget': (data, options, res) => {
      return userWithPartner(data.id).then(user => {
        const saveLimit = data.salary - data.savings
        if (typeof user.partner === 'object') {
          return Budget.create({
            name: data.name ? data.name : 'Budget-' + Math.floor(Math.random() * 3000000).toString(),
            user: user.user._id,
            partner: user.partner._id,
            month: new Date().getMonth(),
            salary: data.salary,
            savings: data.savings,
            saveLimit: saveLimit,
            overLimit: false
          }).then(budget => budget)
        } else {
          return Budget.create({
            name: data.name ? data.name : 'Budget-' + Math.floor(Math.random() * 3000000).toString(),
            user: user.user._id,
            month: new Date().getMonth(),
            salary: data.salary,
            savings: data.savings,
            saveLimit: saveLimit,
            overLimit: false
          }).then(budget => budget)
        }
      })
    },
    /**
     * Create new expense
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/new/expense': (data, options, res) => {

    }
  }
}