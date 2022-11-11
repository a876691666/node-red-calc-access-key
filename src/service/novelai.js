const fs = require('fs');
const { getImage } = require('../utils/fetch');
const { getStoragePath } = require('../utils/path');

const fetchSaveImage = async (accessToken, input, seed) => {
  const file = await getImage({
    accessToken,
    input,
    seed,
  });

  fs.writeFileSync(getStoragePath("test.png"), file, 'binary');
}

module.exports = {
  fetchSaveImage,
};