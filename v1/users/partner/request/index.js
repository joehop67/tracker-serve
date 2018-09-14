const User = require('../../../../lib/db')
const Request = require('../../../../lib/request')
const error = require('../../../../lib/reterror')

module.exports = {
  post: {
    '/': (data, options, res) => {
      return User.findOne({email: data.partner}).then(user => {
        return Request.create({recipientEmail: data.partner,
          requesterEmail: data.userEmail,
          recipientId: user._id,
          requesterId: data.id})
            .then(request => {
              user.set({partnerRequest: request._id})
              user.save()
              return request
          })
        })
    }
  }
}