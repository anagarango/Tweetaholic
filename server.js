const express = require("express")
require('dotenv').config() //loads ENV Variables
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const methodOverride = require("method-override")
const { posts, reportPosts, } = require('./database')
const database = require('./database')
const morgan = require('morgan')
const mongoose = require('mongoose')
let twoot = require('./models/posts')

// DB connection
const DATABASE_URL = process.env.DATABASE_URL
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

// Establish Connection
mongoose.connect(DATABASE_URL, CONFIG)

// Events for when connection opens/disconnects/errors
mongoose.connection
.on("open", () => console.log("Connected to Mongoose 💀💀💀"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public')); // static files middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public')) //serves public folders
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) //overrides built in reqs from forms

// Routes
app.get('/', async (req, res) => {
  
  const post = await twoot.find({})

  res.render('index.ejs', {post})


})

// To seed db. Refer to modes/posts for db schema when making creating posts
app.get('/seed', async (req, res) =>{
  // await twoot.remove({})

  await twoot.create([{
    postId: 1,
    name: 'Ishan',
    title: 'Hello World',
    body: 'I need sleep',
    time: new Date().toLocaleDateString()
  }])

  res.redirect('/')
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
  res.redirect("/posts")
  // res.json({message:message})
})


app.post('/post/delete/:id'), (req, res) => {
  const id = +req.params.id
  database.DeletePost(id)
  res.redirect("/reported")

}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})