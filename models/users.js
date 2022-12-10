const mongoose = require('mongoose')
const { Schema, model, models } = mongoose

var userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  age: Number,
  following: [{
    userId: String
  }],
  reported: [{
    postId: String
  }]

})

userSchema.set('timestamps', true)

var users = model('Users', userSchema)
var createNewSchema = models.userSchema

module.exports = createNewSchema || users