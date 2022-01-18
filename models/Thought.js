const { Schema, model } = require('mongoose')

const Thought = new Schema({
  body: {
    type: String,
    required: 'Cannot leave post empty',
    minlength: 1,
    maxlength: 300
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'note'
  }],
}, { timestamps: true })

module.exports = model('thought', Thought)
