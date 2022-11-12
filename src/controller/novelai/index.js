const Router = require('koa-router');
const { getImage } = require('../../utils/fetch');
const { calcAccessKey } = require('../../utils');
const { fetchSaveImage, getAccessToken } = require('../../service/novelai');

const router = new Router({
  prefix: '/novelai',
});

router
  .get('/getToken', async (ctx, next) => {
    const result = await getAccessToken()
    ctx.body = JSON.stringify(result);
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