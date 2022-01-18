const { Schema, model } = require('mongoose')

const Note = new Schema({
  body: {
    type: String,
    required: true,
    minlength: 1,
    maxLength: 300
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  thought: {
    type: Schema.Types.ObjectId,
    ref: 'thought',
    required: true
  },
}, {timestamps: true})

module.exports = model('note', Note)
