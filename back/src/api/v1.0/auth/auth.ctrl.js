const Joi = require('joi');
const User = require('../../../db/models/User');

// local register function
exports.localRegister = async (ctx) => {
  const { body } = ctx.request;

  const schema = Joi.object({
    displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30),
  });
  const result = Joi.validate(body, schema);

  // Schema error
  if (result.error) {
    ctx.status = 400;
    ctx.body = 'Schema error';
    // eslint-disable-next-line no-useless-return
    return;
  }
  const { displayName, email, password } = body;

  try {
    // check email or displayName existancy
    const exists = await User.findExistancy({ email, displayName })
      .catch((e) => console.log(`❌  Error occured at User.findByEmail: ${e}`));
    if (exists) {
      ctx.status = 409;
      const key = exists.email === email ? 'email' : 'displayName';
      ctx.body = {
        message: `Already exists [${key}]`,
      };
      return;
    }
    // creates user account
    const user = await User.localRegister({
      displayName, email, password,
    });
    // local storage에 저장하기 위한 응답메시지
    ctx.body = {
      displayName,
      email,
      // eslint-disable-next-line no-underscore-dangle
      _id: user._id,
      metaInfo: user.metaInfo,
    };
  } catch (error) {
    console.log(error);
    ctx.throw(500);
  }
};

// local login function
exports.localLogin = async (ctx) => {

};
