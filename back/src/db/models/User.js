const mongoose = require('mongoose');
const token = require('../../lib/token');

const { PASSWORD_HASH_KEY: secret } = process.env;

const User = new mongoose.Schema({
  displayName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// 이메일 찾기
User.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// 닉네임 찾기
User.statics.findByDisplayName = function (displayName) {
  return this.findOne({ displayName });
};

// 이메일과 닉네임 찾기
User.statics.findExistancy = function ({ email, displayName }) {
  return this.findOne({
    $or: [
      { email },
      { displayName },
    ],
  });
};

// create user token
User.methods.generateToken = function () {
  const { _id, displayName, email } = this;
  return token.generateToken({
    user: {
      _id,
      displayName,
      email,
    },
  }, 'user');
};

// local 회원가입
User.statics.localRegister = function ({ displayName, email, password }) {
  const user = new this({
    displayName,
    email,
    password,
  });
  user.save();
  return user;
};

module.exports = mongoose.model('User', User);
