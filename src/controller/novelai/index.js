const Router = require('koa-router');
const { getImage } = require('../../utils/fetch');
const { calcAccessKey } = require('../../utils');
const { fetchSaveImage } = require('../../service/novelai');

const router = new Router({
  prefix: '/novelai',
});

router
  .get('/get', async (ctx, next) => {
    const email = process.env['EMAIL'];
    const password = process.env['PASSWORD'];
    const key = await calcAccessKey(email, password);
    ctx.body = JSON.stringify({ key });
  });

router
  .get('/getImage', async (ctx, next) => {
    const { accessToken, seed, input } = ctx.query;

    fetchSaveImage(accessToken, input, seed);

    ctx.body = "start!";
  });

router
  .post('/getImage', async (ctx, next) => {
    const { accessToken, seed, input } = ctx.request.body;

    fetchSaveImage(accessToken, input, seed);

    ctx.body = "start!";
  });

module.exports = router;