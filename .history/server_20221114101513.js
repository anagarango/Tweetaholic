const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())