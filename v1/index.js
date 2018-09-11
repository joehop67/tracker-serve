const User = require('../lib/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    post: {
        '/': data => {
            console.log(data.password)
            if (data.email && data.password) {
                const hashed = bcrypt.hashSync(data.password, 10)

                return User.create({email: data.email, password: hashed}).then(user => jwt.sign({id: user._id}, process.env.JWT_SECRET))
            }
            return 'No email entered'
        }
    }
}