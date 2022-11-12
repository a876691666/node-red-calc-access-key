const fs = require('fs');
const { getImage, getToken } = require('../utils/fetch');
const { getStoragePath } = require('../utils/path');
const { calcAccessKey } = require('../utils');

const fetchSaveImage = async (accessToken, input, seed, id) => {
  const file = await getImage({
    accessToken,
    input,
    seed,
  });

  if (file.error) {
    console.log("error", accessToken, input, seed, id);
    return;
  }

  fs.writeFileSync(getStoragePath(`${id}/${seed}.png`), file, 'binary');
}

const getAccessToken = async () => {
  const email = process.env['EMAIL'];
  const password = process.env['PASSWORD'];
  const check = fs.existsSync(getStoragePath("token.json"));
  if (check) {
    const token = JSON.parse(fs.readFileSync(getStoragePath("token.json"), 'utf8'));
    if (token.expires_in > Date.now()) {
      return token;
    }
  }
  const key = await calcAccessKey(email, password);
  const result = await getToken(key);
  result.expires_in = Date.now() + 24 * 60 * 60 * 1000;
  fs.writeFileSync(getStoragePath("token.json"), JSON.stringify(result));
  return result;
}

module.exports = {
  fetchSaveImage,
  getAccessToken,
};