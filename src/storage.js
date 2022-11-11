const storage = {
  accessToken: "",
}

const set = (key, value) => {
  storage[key] = value;
}

const get = (key) => {
  return storage[key];
}

module.exports = {
  set,
  get,
}