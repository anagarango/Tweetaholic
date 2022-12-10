const express = require("express")
const router = express.Router()
const Reported = require('../models/reports')
const twoot = require('./../models/posts')
const userModel = require('./../models/users')
const jwt = require('jsonwebtoken')
bcrypt = require("bcrypt")
const saltRounds = 10
const JWT_SECRET = process.env.jwt

router.post('/', async (req, res) => {

    const sent = req.body
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds)
    let newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashedPwd,
        age: req.body.age
    })

    try {
        savedUser = await newUser.save()
        console.log(savedUser)
        res.redirect('/')

    } catch (e) {
        console.log(e)
    }
})

router.get('/', (req, res) => {
    res.render('users/login')
})

router.get('/signup', async (req, res) => {

    res.render('users/signup', { newUser: new userModel() })

})

const verifyUserLogin = async (email, password) => {


    try {
        const user = await userModel.findOne({ email }).lean()
        if (!user) {
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(password, user.password)) {
            // creating a JWT token
            token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    type: 'user'
                },
                JWT_SECRET,
                {
                    expiresIn: '2h'
                })
            return {
                status: 'ok',
                data: token
            }
        }
        return { status: 'error', error: 'invalid password' }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'timed out' }
    }
}

router.post('/login', async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    const response = await verifyUserLogin(email, password)

    if (response.status === 'ok') {
        // storing our JWT web token as a cookie in our browser
        res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours

        res.redirect('/')
    } else {
        res.redirect('/users/signup')
    }

})

module.exports = router