// local register function
exports.localRegister = async (ctx) => {
  const { body } = ctx.request;
  console.log(body);
  ctx.body = '✅ Welcome to register!!';
};

// local login function
exports.localLogin = async (ctx) => {

};
