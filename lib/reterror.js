const morph = require('morph-stream')

/**
 * Return custom HTTP error
 * 
 * @param {Number} code
 * @param {String} message
 * @param {Object} res
 */

module.exports = (code, message, res) => {
  return morph(status(res, {message: message, status: code}))
}

/**
 * Set Status header
 * 
 * @param {Object} res
 * @param {Object} err
 */

function status (res, err) {
  const code = res.statusCode = Number(err.status) || 400
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  return Promise.resolve({
    error: {
      status: code,
      message: err.message,
      payload: err.payload || {}
    }
  })
}