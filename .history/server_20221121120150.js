const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const { posts, reportPosts } = require('./database')
const database = require('./database')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public')); // static files middleware
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/posts', (req, res) => {
  res.render('posts.ejs', {
    posts,
  })
})

app.get('/reported', (req, res) => {
  res.render('reported.ejs', {
    reportPosts,
  })
})
app.post('/post/report/:id', (req, res) => {
  const id = +req.params.id
  const result = posts.filter(posts => posts.id == id);
  var message = result[0].name
  reportPosts.push(result[0])
  res.redirect()
  // res.json({message:message})
})


app.post('/post/delete/:id'), (req, res) => {
  const id = +req.params.id
  database.DeletePost(id)
  res.redirect("/reported")

}

const PORT = 4000
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})