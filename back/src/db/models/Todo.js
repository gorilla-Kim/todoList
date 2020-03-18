const mongoose = require('mongoose');

const Todo = new mongoose.Schema({
  title: String,
  content: String,
  complete: Boolean,
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
