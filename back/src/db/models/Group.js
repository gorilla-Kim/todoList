const mongoose = require('mongoose');

const Group = new mongoose.Schema({
  name: String,
  leader: { // 해당 그룹을 작성한 User, 추후 변동가능
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  users: {
    type: Array,
    value: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  todos: {
    type: Array,
    value: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Group', Group);
