const { initEnv } = require('./src/utils/env');
initEnv();
const { init: pmInit } = require('./src/service/photoManager');
pmInit()

const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('koa-router');



const app = new Koa();
const router = new Router();

router.use('/api', require('./src/controller/novelai').routes());
router.use('/api', require('./src/controller/photoManager').routes());

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8888);
