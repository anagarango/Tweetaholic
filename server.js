const express = require("express")
require('dotenv').config() //loads ENV Variables
const bodyParser = require('body-parser')
const app = express()
const methodOverride = require("method-override")
const { dbConnect } = require('./database')
const morgan = require('morgan')
const twootRoute = require('./routes/twoot')
const reportedRouter = require("./routes/reports")
const usersRouter = require('./routes/auth')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.jwt
var cookieParser = require('cookie-parser')

let twoot = require('./models/posts')

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
app.use(cookieParser())


// Routes

app.use('/twoot', twootRoute)
app.use('/send-report', reportedRouter)
app.use('/users', usersRouter)


const verifyToken = (token) => {
  try {
    const verify = jwt.verify(token, JWT_SECRET)
    if (verify.type === 'user') { return true }
    else { return false }
  } catch (error) {
    console.log('not logged in')
    return false
  }
}

app.get('/', async (req, res) => {
  const { token } = req.cookies

  if (verifyToken(token)) {

    const post = await twoot.find({}).sort({
      createdAt: 'desc'
    })
    const decode = jwt.decode(token)

    console.log(decode)
    res.render('twoots/index.ejs', { post })

  } else {
    res.redirect('/users')
  }


})

app.post('/', (req, res) =>{
  res.clearCookie('token')
  res.redirect('/')
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})

