const mongoose = require('mongoose')

const { pick } = require('lodash')

const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
  reservasUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }],
  cuponesUser: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cupon' }],
})

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    pick(this, ['name', 'username', 'isAdmin']),
    process.env['jwt_privateKey']
  )
}

const User = mongoose.model('User', userSchema)

module.exports = User
