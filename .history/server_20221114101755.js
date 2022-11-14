const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs");



const PORT = 3000
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`)
})