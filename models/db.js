/**
 * Dependencies
 */
const mongoose = require('mongoose')

//Create Mongoose Connection
const connection = mongoose.createConnection(process.env.MONGO_URL)
const Schema = mongoose.Schema

//Define User Schema
const userSchema = new Schema({
  email: {type: String, unique: true},
  name: String,
  password: String,
  partner: Schema.ObjectId,
  hasPartner: Boolean,
  partnerRequest: Schema.ObjectId,
  currentBudget: Schema.ObjectId,
  salary: Number
})

//Create User Model
const User = connection.model('User', userSchema)

module.exports = User