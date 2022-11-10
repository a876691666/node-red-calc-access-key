const request = require('request');

function getImage({ accessToken, input, seed }) {
  return new Promise((resolve, reject) => {
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
    console.log('fetch');
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
    }, (err, res, body) => {
      const binary = Buffer.from(body.slice(27), 'base64');
      resolve(binary);
    });
  });
}

module.exports = {
  getImage,
};