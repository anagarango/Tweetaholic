const express = require('express')
const router = express.Router()
const Twoot = require('./../models/posts')

router.get('/', (req, res) => {
  res.send('TEST')

})

router.get('/new', (req, res) => {

  res.render('twoots/new', { newtwoot: new Twoot() })

})

router.get('/:id', async (req, res) => {
  const twoot = await Twoot.findById(req.params.id)
  if (twoot == null) res.redirect('/')
  res.render('twoots/show', { twoot: twoot })

})

router.post('/', async (req, res) => {

  let newtwoot = new Twoot({
    title: req.body.title,
    body: req.body.body,
  })

  try {
    newtwoot = await newtwoot.save()
    console.log(newtwoot.id)
    res.redirect(`/twoot/${newtwoot.id}`)
  } catch (e) {
    res.render('twoots/new', { newtwoot: newtwoot })
    console.log(e)
  }

})

router.get('/:id/update', async (req, res) => {
  let twoot = await Twoot.findById(req.params.id)
  res.render('twoots/edit', { twoot })
})

router.post('/update', async (req, res) => {

  const findId = req.body.id
  const update = {
    title: req.body.title,
    body: req.body.body,

  }
  await Twoot.findByIdAndUpdate(findId, update)
  res.redirect('/')
})

module.exports = router