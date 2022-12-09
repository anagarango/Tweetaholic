const express = require("express")
require('dotenv').config() //loads ENV Variables
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const methodOverride = require("method-override")
const {dbConnect} = require('./database')
const database = require('./database')
const morgan = require('morgan')
const twootRoute = require('./routes/twoot')
const reportedRouter = require("./routes/reports")

let twoot = require('./models/posts')
let report = require('./models/reports')

// Connect to DB
dbConnect()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public')); // static files middleware
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public')) //serves public folders
app.use(morgan("tiny")) //logging
app.use(methodOverride("_method")) //overrides built in reqs from forms
app.use('/twoot', twootRoute)
app.use('/send-report', reportedRouter)

// Routes

app.get('/', async (req, res) => {
  
  const post = await twoot.find({}).sort({
    createdAt: 'desc'
  })
  
  res.render('twoots/index.ejs', {post})
  
  
})

// app.get('/send-report', async (req, res) => {
  
//   const reportPost = await report.find({}).sort({
//     createdAt: 'asc'
//   })
  
//   res.render('reported/reported.ejs', {reportPost})
  
  
// })

// To seed db. Refer to modes/posts for db schema when making creating posts
app.get('/seed', async (req, res) =>{
  // await twoot.remove({})
  
  try {
    // await twoot.create([{
    //   title: 'Elon Musk sucks!',
    //   body: 'I seriously do not know why hes makign us pay for Twitter!',
    // }])
    res.end('Youre not supposed to be here')
  } catch (e) {
    console.log(e.message)
  }

  res.redirect('/')
})



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})