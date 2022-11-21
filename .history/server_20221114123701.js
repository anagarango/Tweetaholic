const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const { posts } = require('./database')
const { reportPosts } = require('./database')

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

// app.post('/notes/:id/report', (req, res) => {
//   // const id = +req.params.id
//   // res.render('posts')
// })

const PORT = 3000
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})