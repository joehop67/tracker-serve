/**
 * Dependencies
 */
const mongoose = require('mongoose')

//Create Mongoose Connection
const connection = mongoose.createConnection(process.env.MONGO_URL)
const Schema = mongoose.Schema

// Define partner request schema
const partnerRequestSchema = new Schema({
  recipientEmail: String,
  requesterEmail: String,
  recipientId: Schema.ObjectId,
  requesterId: Schema.ObjectId
})

// Define partner request model
const Request = connection.model('Request', partnerRequestSchema)

// Export model
module.exports = Request