const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  title: String,
  color: String,
  doDate: Date,
  content: String,
  activate: {
    type: Boolean,
    default: false,
  },
  user: { // 해당 메모를 작성한 User
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Todo', Todo);
