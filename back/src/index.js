/* eslint-disable camelcase */
// 환경변수를 불러옵니다.
require('dotenv').config();

// 서버에서 사용할 포트를 불러옵니다.
const {
  PORT: port,
} = process.env;
// 추가되는 모듈들
const Koa = require('koa');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const compress = require('koa-compress');
const serve = require('koa-static');
const path = require('path');
const send = require('koa-send');
const zlib = require('zlib');
const api = require('./api');
const db = require('./db');

/* DB connention */
db.connect();

// app을 생성해줍니다.
const app = new Koa();

// 미들웨어 연결
app.use(helmet());
app.use(compress({
  filter(content_type) {
    return /text/i.test(content_type);
  },
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH,
}));
app.use(serve(path.join(__dirname, '../../front/build')));
app.use(bodyParser());


// about routing
const router = new Router();

router.use('/api', api.routes());
// main route
router.get('/', async (ctx) => {
  const mainPath = path.join(__dirname, '../../front/build');
  await send(ctx, 'index.html', { root: mainPath });
});

app.use(router.routes());
app.use(router.allowedMethods());

// app을 활성화상태에 둡니다.
app.listen(port, () => {
  console.log(`✅  MEMO server is listening http://localhost:${port}`);
});
