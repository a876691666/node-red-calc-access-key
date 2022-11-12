const Router = require('koa-router');
const { add, getAll, get, getChildNames, getImage, removeImage } = require('../../service/photoManager');
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

router
  .get('/getTaskList', async (ctx, next) => {
    const taskList = getAll();
    ctx.body = taskList;
  });

router
  .get('/:id/getTask', async (ctx, next) => {
    const { id } = ctx.params;
    const task = get(id);
    ctx.body = task;
  });

router
  .get('/:id/getNames', async (ctx, next) => {
    const { id } = ctx.params;
    const names = getChildNames(id);
    ctx.body = names;
  });

router
  .get('/:id/getImage/:name', async (ctx, next) => {
    const { id, name } = ctx.params;
    const image = getImage(id, name);
    if (image) {
      ctx.body = image;
      ctx.type = 'image/jpeg';
    } else {
      ctx.body = 'not found';
      ctx.status = 404;
    }
  });

router
  .get('/:id/removeImage/:name', async (ctx, next) => {
    const { id, name } = ctx.params;
    removeImage(id, name);
    ctx.body = "remove success!";
  });

module.exports = router;