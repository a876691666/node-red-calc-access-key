const { calcAccessKey } = require('./src/utils');

const Koa = require('koa');
const Router = require('@koa/router');
const { koaBody } = require('koa-body');
const { getImage } = require('./src/utils/fetch');

const app = new Koa();
const router = new Router();

router
  .get('/get', async (ctx, next) => {
    const { email, password } = ctx.query;
    ctx.body = await calcAccessKey(email, password);
  });

router
  .get('/getImage', async (ctx, next) => {
    const { accessToken, seed, input } = ctx.query;

    const result = await getImage({ accessToken, input, seed });
    ctx.type = 'image/png';
    ctx.body = result;
  });

router
  .post('/getImage', async (ctx, next) => {
    const { accessToken, seed, input } = ctx.request.body;

    const result = await getImage({ accessToken, input, seed });
    ctx.type = 'image/png';
    ctx.body = result;
  });

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8888);
