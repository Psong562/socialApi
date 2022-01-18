const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

// get all post
router.get('/posts', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.find({}).populate('user')
  res.json(posts)
})

// get one post
router.get('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  const posts = await Post.findById(req.params.id).populate('user').populate('notes')
  res.json(posts)
})

// CREATE one  post
router.post('/posts', passport.authenticate('jwt'), async function (req, res) {
  const post = await Post.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
  res.json(post)
})

// UPDATE one post
router.put('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.findByIdAndUpdate(req.params.id, { $set:req.body }) 
  res.sendStatus(200)
})


// DELETE one post
router.delete('/posts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Post.findOneAndDelete(req.params.id )
  res.sendStatus(200)
})

module.exports = router
