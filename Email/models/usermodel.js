const mongoose = require("mongoose");
const { Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required : true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  otp : {
    type : Number,
    default : 0,
  },
  verify : {
    type : Boolean,
    default : false,
  },
  
})



const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel