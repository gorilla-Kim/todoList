const mongoose = require('mongoose');

const User = new mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', User);
