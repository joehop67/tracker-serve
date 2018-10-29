/**
 * Dependencies
 */
const User = require('../../../../models/db')
const Request = require('../../../../models/request')
const error = require('../../../../lib/reterror')

module.exports = {
  post: {
    /**
     * Request given user be partner
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     * @api public
     */
    '/': (data, options, res) => {
      return User.findById(data.id).then(current => {
        if (current.hasPartner || current.partnerRequest) return {message: 'Cannot Request More than one partner'}
        return User.findOne({email: data.partner}).then(user => {
          if (user._id.toString() === data.id) return {message: 'Cannot request yourself'}
          if (user.hasPartner || user.partnerRequest) return {message: 'Already has a partner'}
          return Request.create({recipientEmail: data.partner,
            requesterEmail: data.current_user,
            recipientId: user._id,
            requesterId: data.id})
              .then(request => {
                current.set({partnerRequest: request._id})
                current.save()
                user.set({partnerRequest: request._id})
                user.save()
                return request
            })
          })
      })
    },
    /**
     * Accept given partner request
     * 
     * @param {Object} data
     * @param {Object} options
     * @param {Object} res
     */
    '/accept': (data, options, res) => {
        if (data.accept === 'accept') {
          return Request.findById(data.request).then(req => {
            if (data.id !== req.recipientId.toString()) return {message: 'You are not the recipient'}
            User.findById(req.recipientId).then(recipient => {
              recipient.set({partner: req.requesterId, hasPartner: true, partnerRequest: null})
              recipient.save()
            })
            User.findById(req.requesterId).then(requester => {
              requester.set({partner: req.recipientId, hasPartner: true, partnerRequest: null})
              requester.save()
            })
            req.remove()
            return data
          })
        }
    }
  },
  get: {
    /**
     * Get partner requests of current user
     * 
     * @param {Object} data
     */
    '/': data => {
      return User.findById(data.id).then(user => {
        if (user.partnerRequest) return Request.findById(user.partnerRequest).then(req => {
          if (req.recipientId.toString() === user._id.toString()) return req
          else return {message: 'No request'}
        })
        else return {message: 'No Request'}
      })
    }
  }
}