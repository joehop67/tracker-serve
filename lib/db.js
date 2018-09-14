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
  password: String,
  partner: Schema.ObjectId,
  hasPartner: Boolean,
  partnerRequest: Schema.ObjectId
})

const partnerRequestSchema = new Schema({
  recipientEmail: String,
  requesterEmail: String,
  recipientId: Schema.ObjectId,
  requesterId: Schema.ObjectId
})

const groupSchema = new Schema({
  members: Array,
  leader: Schema.ObjectId
})

//Create User Model
const User = connection.model('User', userSchema)

module.exports = User