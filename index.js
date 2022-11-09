const libsodium = require('libsodium-wrappers');
const http = require('http')

let server = http.createServer();

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

server.on('request', (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const email = url.searchParams.get('email');
  const password = url.searchParams.get('password');

  if (!req.url.includes('/get')) {
    return res.end();
  }
  res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' })
  calcAccessKey(email, password).then((key) => {
    res.end(JSON.stringify({ key }))
  }).catch(() => {
    res.end(JSON.stringify({ error: true }))
  });
});

server.listen(8888, () => {
  console.log('server start 8888');
});
