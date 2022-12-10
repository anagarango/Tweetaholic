const mongoose = require('mongoose')
const { Schema, model, models } = mongoose

var postsSchema = new Schema([
  {
    author: mongoose.SchemaTypes.ObjectId,
    title: {
      type: String,
      required: true
    },
    body: String,

  }]
)
postsSchema.set('timestamps', true)
var posts = model('Posts', postsSchema)
var createNewSchema = models.postsSchema

// if schema exists, do your thing if not, create a new one
module.exports = createNewSchema || posts