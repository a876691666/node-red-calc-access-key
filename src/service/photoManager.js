const fs = require('fs');
const { getStoragePath } = require('../utils/path');
const { fetchSaveImage, getAccessToken } = require('./novelai');

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

  start();
}

const update = () => {
  fs.writeFileSync(getStoragePath("task.db"), storage.map(item => JSON.stringify(item)).join('\n'));
  start();
}

const add = (id, input, planNum = 500) => {
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

const getAll = () => {
  return storage;
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

const next = async () => {
  const item = storage.find(item => item.current < item.planNum);
  const { accessToken } = await getAccessToken();
  if (item && accessToken) {
    await fetchSaveImage(accessToken, item.input, Math.round(Math.random() * 1000000000), item.id);
    item.current += 1;

    update();
    next();
  }
}

const start = async () => {
  next();
}

const getChildNames = (id) => {
  const path = getStoragePath(id);
  const check = fs.existsSync(path);
  if (check) {
    return fs.readdirSync(path);
  }
  return [];
}

const getImage = (id, name) => {
  const path = getStoragePath(`${id}/${name}`);
  console.log(path);
  const check = fs.existsSync(path);
  if (check) {
    return fs.readFileSync(path);
  }
  return null;
}

const removeImage = (id, name) => {
  const path = getStoragePath(`${id}/${name}`);
  const check = fs.existsSync(path);
  if (check) {
    fs.unlinkSync(path);
  }
}

module.exports = {
  init,
  update,
  add,
  get,
  getAll,
  updateCurrent,
  remove,
  getChildNames,
  getImage,
  removeImage,
  storage,
}