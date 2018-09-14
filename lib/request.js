/**
 * Dependencies
 */
const mongoose = require('mongoose')

//Create Mongoose Connection
const connection = mongoose.createConnection(process.env.MONGO_URL)
const Schema = mongoose.Schema

const partnerRequestSchema = new Schema({
  recipientEmail: String,
  requesterEmail: String,
  recipientId: Schema.ObjectId,
  requesterId: Schema.ObjectId
})

const Request = connection.model('Request', partnerRequestSchema)

module.exports = Request