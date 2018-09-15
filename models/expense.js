/**
 * Dependencies
 */
const mongoose = require('mongoose')

//Create Mongoose Connection
const connection = mongoose.createConnection(process.env.MONGO_URL)
const Schema = mongoose.Schema

// Define Expense Schema
const expenseSchema = new Schema({
  type: String,
  name: String,
  costType: String,
  cost: Number,
  budget: Schema.ObjectId,
  user: Schema.ObjectId
})

// Define Expense Model
const Expense = connection.model('expense', expenseSchema)

// Export Model
module.exports = Expense