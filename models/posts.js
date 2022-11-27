const mongoose = require('mongoose')
const {Schema, model, models} = mongoose

var userSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  createdAt: Date,
  updatedAt: Date,
  // posts: postsSchema,
  following: [],
  
})

var postsSchema =  new Schema([
  {
    author: mongoose.SchemaTypes.ObjectId,
    title: {
      type: String,
      required: true
    },
    body: String,
    createdAt: {
      type: Date,
      default: Date.now
    },
    editedAt: String
  }]
  )

var posts = model('Posts', postsSchema)
var createNewSchema = models.postsSchema

// if schema exists, do your thing if not, create a new one
module.exports = createNewSchema || posts