const libsodium = require('libsodium-wrappers');

async function calcAccessKey(email, password) {
  await libsodium.ready
  return libsodium.crypto_pwhash(
    64,
    new Uint8Array(Buffer.from(password)),
    libsodium.crypto_generichash(
      libsodium.crypto_pwhash_SALTBYTES,
      password.slice(0, 6) + email + 'novelai_data_access_key',
    ),
    2,
    2e6,
    libsodium.crypto_pwhash_ALG_ARGON2ID13,
    'base64').slice(0, 64)
}

module.exports = {
  calcAccessKey,
}