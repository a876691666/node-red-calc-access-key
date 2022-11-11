const path = require('path');

const getStoragePath = (filepath) => {
  return path.join(process.env['STORAGE_PATH'], filepath);
}

module.exports = {
  getStoragePath,
};