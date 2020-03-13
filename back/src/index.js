// 환경변수를 불러옵니다.
require('dotenv').config();

// 서버에서 사용할 포트를 불러옵니다.
const {
  PORT: port,
} = process.env;
// 추가되는 모듈들
const Koa = require('koa');
const helmet = require('koa-helmet');

// app을 생성해줍니다.
const app = new Koa();

// 미들웨어 연결
app.use(helmet());

// test 응답
app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

// app을 활성화상태에 둡니다.
app.listen(port, () => {
  console.log(`✅  MEMO server is listening http://localhost:${port}`);
});
