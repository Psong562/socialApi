const { Schema, model } = require('mongoose')

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Must be Valid Email adress'],
  },
  thought: [{
    type: Schema.Types.ObjectId,
    ref: 'thought'
  }],
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'note'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
}, {toJSON: {
    virtuals: true
  },
  id:false 
},
  { timestamps: true })


User.virtual('friendCount').get(function () {
  return this.friends.length
})


User.plugin(require('passport-local-mongoose'))

module.exports = model('user', User)
