const Router = require('koa-router');
const auth = require('./auth');

const api = new Router();

/* /api/v1.0/... */
api.use('/auth', auth.routes());

module.exports = api;
