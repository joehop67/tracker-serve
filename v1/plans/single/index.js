/**
 * Dependencies
 */
const User = require('../../../models/db')
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
        if (user.user.currentBudget) {
          Budget.findByIdAndUpdate(user.user.currentBudget, {current: false}).then(res => {
            console.log(res)
          })
        }
        const salary = user.user.salary
        if (!salary) {
          return error(404, 'Must enter salary before you can create a budget', res)
        }
        const saveLimit = salary - data.savings
        return Budget.create({
          name: data.name ? data.name : 'Budget-' + Math.floor(Math.random() * 3000000).toString(),
          user: user.user._id,
          partner: typeof user.partner === 'object' ? user.partner._id : null,
          month: new Date().getMonth(),
          savings: data.savings,
          saved: 0,
          saveLimit: saveLimit,
          overLimit: false,
          current: true
        }).then(budget => {
          if (data.expenses) {
            const promises =  data.expenses.map(async expense => {
              return Expense.findById(expense).then(ex => {
                if (ex._id.toString() === data.id) {
                  budget.expenses.push(ex._id)
                  budget.save()
                } else return {message: 'Could not add expense'}
              })
            })
            return Promise.all(promises).then(resolved => {
              if (resolved[0].message) return {...budget._doc, message: 'Could not add expense'}
              return budget
            })
          } else return budget
        }).then(created => {
          return User.findByIdAndUpdate(data.id, {currentBudget: created._id}).then(() => created)
        })
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
      return User.findById(data.id).then(user => {
        return Expense.create({
          type: data.type,
          name: data.name,
          costType: data.cost_type,
          cost: data.cost,
          budget: data.budget ? data.budget : null,
          user: user._id
        })
      })
    }
  },
  put: {
  /**
   * Update Budget with either name or add an expense
   * 
   * @param {Object} data
   * @param {Object} options
   * @param {Object} res
   * @api public
   */
    '/update/budget/:budget': (data, options, res) => {
      return Budget.findById(data.budget).then(budget => {
        if (!budget) return error(404, 'Budget not found', res)
        return User.findById(budget.user).then(user => {
          if (data.expense) {
            return Expense.findByIdAndUpdate(data.expense, {budget: budget._id}).then(expense => {
              budget.expenses.push(expense._id)
              data.name ? budget.set({name: data.name}) : null
              budget.save()
              return budget
            })
          } else {
            budget.set({name: data.name, saved: Number(data.saved)})
            budget.save()
            return budget
          }
        })
      })
    }
  },
  /**
   * Get all users' budgets
   * 
   * @param {Object} data
   * @param {Object} options
   * @param {Object} res
   * @api public
   */
  get: {
    '/budgets': (data, options, res) => {
      return User.findById(data.id).then(user => {
        return Budget.find({user: user._id}).then(budgets => {
          return budgets
        })
      })
    },
    /**
     * Get all users' expenses
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/expenses': (data, options, res) => {
      return User.findById(data.id).then(user => {
        return Expense.find({user: user._id}).then(expenses => {
          return expenses
        })
      })
    },
    /**
     * Get budget by ID
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/budgets/:budget': (data, options, res) => {
      return User.findById(data.id).then(user => {
        return Budget.findById(data.budget).then(budget => {
          if (budget.user.toString() !== user._id.toString()) return error(403, 'You are not authorized to access this budget', res)
          else return budget
        })
      })
    }
  }
}