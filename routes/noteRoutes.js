const router = require('express').Router()
const { Post, User, Note } = require('../models')
const passport = require('passport')

// GET all comments
router.get('/notes', passport.authenticate('jwt'), async function (req, res) {
  const notes = await Note.find({}).populate('user')
  res.json(notes)
})


// POST one comment
router.post('/notes', passport.authenticate('jwt'), async function (req, res) {
  const note = await Note.create({
    ...req.body, 
    user: req.user._id,
    post: req.body.postid
  })
  await Post.findByIdAndUpdate(req.body.postid, { $push: {notes:note._id} })
  await User.findByIdAndUpdate(req.user._id, { $push: {notes:note._id} })
  res.json(note)
})

// DELETE one comment
router.delete('/notes/:id', passport.authenticate('jwt'), async function (req, res) {
  await Note.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router
