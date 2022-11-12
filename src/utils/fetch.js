const request = require('request');

function getImage({ accessToken, input, seed }, retry = 3) {
  return new Promise((resolve, reject) => {
    // console.log("getImage", accessToken, input, seed);
    const body = JSON.stringify({
      input,
      model: "safe-diffusion",
      parameters: {
        width: 512,
        height: 768,
        scale: 11,
        sampler: "k_euler_ancestral",
        steps: 28,
        seed,
        n_samples: 1,
        ucPreset: 0,
        qualityToggle: true,
        uc: "lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
      },
    });
    request.post("https://api.novelai.net/ai/generate-image", {
      body: body,
      family: 6, // 重要，ipv4服务器非常慢
      headers: {
        // accept: "*/*",
        // "accept-encoding": "gzip, deflate, br",
        // "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "content-type": "application/json",
        referer: "https://novelai.net/",
        orogin: "https://novelai.net",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
        "authorization": "Bearer " + accessToken,
      },
    }, async (err, res, body) => {
      if (err && retry > 0) {
        resolve(getImage({ accessToken, input, seed }, retry - 1));
      } else if (err) {
        resolve({ error: true })
      }
      if (body && body.slice) {
        resolve(Buffer.from(body.slice(27), 'base64').toString('binary'));
      }
    });
  });
}

function getToken(key) {
  return new Promise((resolve) => {
    request.post("https://api.novelai.net/user/login", {
      body: JSON.stringify({
        key,
      }),
      family: 6, // 重要，ipv4服务器非常慢
      headers: {
        "content-type": "application/json",
      },
    }, (err, res, body) => {
      try {
        const result = JSON.parse(body)
        resolve(result);
      } catch (err) {
        resolve({
          error: true,
        })
      }
    })
  })
}

module.exports = {
  getImage,
  getToken,
};