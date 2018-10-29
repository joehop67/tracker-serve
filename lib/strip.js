/**
 * Tiny function to strip password field from objects
 * 
 * @param {Object} obj
 * @returns {Object}
 */
module.exports = (obj) => {
  const {password, ...noPass} = obj
  return noPass
}