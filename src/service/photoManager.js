const fs = require('fs');
const { getStoragePath } = require('../utils/path');

/**
 * @type {Array<{id: string, input: string, planNum: number, current: number}>}
 */
const storage = [];

const init = () => {
  const check = fs.existsSync('./storage');
  if (!check) {
    fs.mkdirSync('./storage');
  }

  const checkTask = fs.existsSync(getStoragePath("task.db"));
  if (!checkTask) {
    fs.writeFileSync(getStoragePath("task.db"), "");
  }

  const task = fs.readFileSync(getStoragePath("task.db"), 'utf8');
  if (task) {
    const taskList = task.split('\n');
    taskList.forEach((item) => {
      storage.push(JSON.parse(item));
    });
  }
}

const update = () => {
  fs.writeFileSync(getStoragePath("task.db"), storage.map(item => JSON.stringify(item)).join('\n'));
}

const add = (id, input, planNum) => {
  const check = fs.existsSync(getStoragePath(id));
  if (!check) {
    storage.push({
      id,
      input,
      planNum,
      current: 0,
    });
    fs.mkdirSync(getStoragePath(id));
    update();
  } else {
    throw new Error("任务已存在");
  }
}

const get = (id) => {
  return storage.find(item => item.id === id);
}

const updateCurrent = (id, current) => {
  const item = get(id);
  item.current = current;
  update();
}

const remove = (id) => {
  const index = storage.findIndex(item => item.id === id);
  storage.splice(index, 1);
  fs.rmdirSync(getStoragePath(id));
  update();
}

module.exports = {
  init,
  update,
  add,
  get,
  updateCurrent,
  remove,
  storage,
}