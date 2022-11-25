const mongoose = require('mongoose')
const {Schema, model, models} = mongoose

const postsSchema =  new Schema([
  {
      postId: Number,
      name: String,
      title: String,
      body: String,
      time: String
  }]
)

const Posts = model('Posts', postsSchema)

let Post = module.exports = models.postsSchema || Posts