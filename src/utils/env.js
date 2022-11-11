const fs = require('fs');

const initEnv = (filepath = "./env.json") => {
  const json = fs.readFileSync(filepath, 'utf8');
  const env = JSON.parse(json);
  Object.keys(env).forEach((key) => {
    process.env[key] = env[key];
  });
};

module.exports = {
  initEnv,
};