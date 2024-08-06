const mongoose = require("mongoose");
const { Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 25
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel