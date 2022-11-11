const Router = require('koa-router');
const { add } = require('../../service/photoManager');
const md5 = require('md5');

const router = new Router({
  prefix: '/photoManager',
});

router
  .get('/addTask', async (ctx, next) => {
    const { input, number } = ctx.query;
    const trimInput = input.replace(/[\s\,]/g, '');
    try {
      add(md5(trimInput), input, number);
      ctx.body = "start!";
    } catch (err) {
      ctx.body = err.message;
    }
  });

module.exports = router;