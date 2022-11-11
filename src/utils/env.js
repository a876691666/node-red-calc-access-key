const fs = require('fs');

const initEnv = (filepath = "./env.json") => {
  try {
    const json = fs.readFileSync(filepath, 'utf8');
    const env = JSON.parse(json);
    Object.keys(env).forEach((key) => {
      process.env[key] = env[key];
    });
  } catch {
    process.env["STORAGE_PATH"] = "./storage";
    console.log("env.json not found");
  }
};

module.exports = {
  initEnv,
};